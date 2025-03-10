import { NextRequest, NextResponse } from "next/server"
import { appointmentOptions, appointments, organizationSlots, service, transaction } from "@/src/db"
import { db, safeConfig, stripe } from "@/src/lib"

import Stripe from "stripe"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, safeConfig.STRIPE_WEBHOOK_TRANSACTION_SECRET)
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
      const slotId = metadata.slotId
      const petId = metadata.petId
      const isHomeVisit = metadata.isHomeVisit === "true"
      const clientId = paymentIntent.customer as string

      // Récupérer la durée du service pour calculer l'heure de fin

      const serviceQuery = await db.query.service.findFirst({
        where: eq(service.id, serviceId),
      })

      if (!serviceQuery) {
        return NextResponse.json({ error: "Service non trouvé" }, { status: 400 })
      }
      // S'assurer que serviceDuration est un nombre
      const serviceDuration = serviceQuery.duration || 60

      const slotQuery = await db.query.organizationSlots.findFirst({
        where: eq(organizationSlots.id, slotId),
      })

      if (!slotQuery) {
        return NextResponse.json({ error: "Slot non trouvé" }, { status: 400 })
      }

      try {
        const [appointmentQuery] = await db
          .insert(appointments)
          .values({
            proId: professionalId,
            clientId,
            patientId: petId,
            serviceId,
            slotId,
            status: "PAYED",
            atHome: isHomeVisit,
            type: "oneToOne",
          })
          .returning({ id: appointments.id })
          .execute()

        const appointmentId = appointmentQuery?.id

        // Si des options ont été sélectionnées, les ajouter à la réservation
        if (metadata.selectedOptions && appointmentId) {
          const selectedOptions = JSON.parse(metadata.selectedOptions)

          if (selectedOptions.length > 0) {
            await Promise.all(
              selectedOptions.map(async (optionId: string) => {
                await db.insert(appointmentOptions).values({
                  appointmentId,
                  optionId,
                })
              })
            )
          }
        }

        console.log("Rendez-vous créé avec succès, ID:", appointmentId)
      } catch (insertError) {
        console.error("Erreur lors de l'insertion du rendez-vous:", insertError)
      }

      // TODO: Envoyer un email de confirmation au client et au professionnel
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous:", error)
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
