import { eq, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

import { transaction } from "@/src/db"
import { db, stripe } from "@/src/lib"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Gérer les événements de paiement
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const metadata = paymentIntent.metadata

    if (!metadata?.transactionId) {
      return NextResponse.json({ error: "Missing transactionId in metadata" }, { status: 400 })
    }

    // Mettre à jour le statut de la transaction dans la base de données
    await db
      .update(transaction)
      .set({
        status: "COMPLETED",
        updatedAt: new Date(),
      })
      .where(eq(transaction.id, metadata.transactionId))

    // Récupérer les données de réservation depuis les métadonnées
    try {
      // Extraire les métadonnées de la réservation
      const serviceId = metadata.serviceId
      const professionalId = metadata.professionalId
      const date = new Date(metadata.date)
      const time = metadata.time
      const petId = metadata.petId
      const isHomeVisit = metadata.isHomeVisit === "true"
      const additionalInfo = metadata.additionalInfo
      const clientId = paymentIntent.customer as string

      // Calculer l'heure de début et de fin
      const [hours, minutes] = time.split(":").map(Number)
      const beginAt = new Date(date)
      beginAt.setHours(hours, minutes, 0, 0)

      // Récupérer la durée du service pour calculer l'heure de fin
      const serviceQuery = await db.execute(sql`SELECT duration FROM service WHERE id = ${serviceId}`)

      // S'assurer que serviceDuration est un nombre
      const serviceDuration = parseInt(String(serviceQuery.rows[0]?.duration)) || 60

      const endAt = new Date(beginAt)
      endAt.setMinutes(beginAt.getMinutes() + serviceDuration)

      // Créer le rendez-vous dans la base de données avec une requête SQL brute
      try {
        const appointmentQuery = await db.execute(
          sql`INSERT INTO appointments 
              (id, "proId", "clientId", "patientId", "serviceId", "beginAt", "endAt", status, "atHome", type, "createdAt") 
              VALUES 
              (gen_random_uuid(), ${professionalId}, ${clientId}, ${petId}, ${serviceId}, ${beginAt.toISOString()}, ${endAt.toISOString()}, 'PAYED', ${isHomeVisit}, 'oneToOne', NOW()) 
              RETURNING id`
        )

        const appointmentId = appointmentQuery.rows[0]?.id

        // Si des options ont été sélectionnées, les ajouter à la réservation
        if (metadata.selectedOptions && appointmentId) {
          const selectedOptions = JSON.parse(metadata.selectedOptions)

          if (selectedOptions.length > 0) {
            for (const optionId of selectedOptions) {
              await db.execute(
                sql`INSERT INTO appointment_options 
                    ("appointmentId", "optionId") 
                    VALUES 
                    (${appointmentId}, ${optionId})`
              )
            }
          }
        }

        console.log("Rendez-vous créé avec succès, ID:", appointmentId)
      } catch (insertError) {
        console.error("Erreur lors de l'insertion du rendez-vous:", insertError)
      }

      // TODO: Envoyer un email de confirmation au client et au professionnel
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous:", error)
      // Nous ne voulons pas échouer le webhook si l'enregistrement du rendez-vous échoue
      // La transaction a été marquée comme complétée, ce qui est le plus important
    }

    return NextResponse.json({ message: "Payment processed successfully" }, { status: 200 })
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const metadata = paymentIntent.metadata

    if (!metadata?.transactionId) {
      return NextResponse.json({ error: "Missing transactionId in metadata" }, { status: 400 })
    }

    // TODO: Send email to the organization with resend

    // Mettre à jour le statut de la transaction en échec
    await db
      .update(transaction)
      .set({
        status: "FAILED",
        updatedAt: new Date(),
      })
      .where(eq(transaction.id, metadata.transactionId))

    return NextResponse.json({ message: "Payment failed" }, { status: 200 })
  }

  return NextResponse.json({ message: "Event received" }, { status: 200 })
}
