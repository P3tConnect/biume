import { NextRequest, NextResponse } from "next/server"
import {
  appointmentOptions,
  appointments,
  invoice,
  Organization,
  organization,
  OrganizationSlots,
  organizationSlots,
  Pet,
  pets,
  Service,
  service,
  transaction,
  User,
  user,
} from "@/src/db"
import { db, resend, safeConfig, stripe } from "@/src/lib"

import Stripe from "stripe"
import { eq } from "drizzle-orm"
import NewReservationEmailPro from "@/emails/NewReservationEmailPro"
import ReservationWaitingEmailClient from "@/emails/ReservationWaitingEmailClient"

export async function POST(req: NextRequest) {
  const body = await req.text()

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
    const paymentIntentId = paymentIntent.id

    if (!metadata?.transactionId) {
      return NextResponse.json({ error: "Missing transactionId in metadata" }, { status: 400 })
    }

    // Récupérer les données de réservation depuis les métadonnées
    try {
      // Extraire les métadonnées de la réservation
      const serviceId = metadata.serviceId
      const professionalId = metadata.professionalId
      const slotId = metadata.slotId
      const petId = metadata.petId
      const appointmentId = metadata.appointmentId
      const clientId = metadata.clientId
      const amount = metadata.amount

      const transactionQuery = await db.transaction(async tx => {
        const serviceQuery = (await tx.query.service.findFirst({
          where: eq(service.id, serviceId),
        })) as Service

        const professionalQuery = (await tx.query.organization.findFirst({
          where: eq(organization.id, professionalId),
        })) as Organization

        const petQuery = (await tx.query.pets.findFirst({
          where: eq(pets.id, petId),
        })) as Pet

        const clientQuery = (await tx.query.user.findFirst({
          where: eq(user.id, clientId),
        })) as User

        const slotQuery = (await tx.query.organizationSlots.findFirst({
          where: eq(organizationSlots.id, slotId),
        })) as OrganizationSlots

        return {
          serviceQuery,
          professionalQuery,
          petQuery,
          clientQuery,
          slotQuery,
        }
      })

      const { professionalQuery, clientQuery, petQuery, serviceQuery, slotQuery } = transactionQuery

      try {
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

        const session = await stripe.checkout.sessions.list({
          payment_intent: paymentIntentId,
          limit: 1,
        })

        if (session.data.length > 0) {
          // Créer la facture
          const [invoiceQuery] = await db
            .insert(invoice)
            .values({
              total: parseInt(amount),
              appointmentId: appointmentId,
              checkoutSessionId: session.data[0].id,
              proId: professionalId,
              clientId: clientId,
            })
            .returning()
            .execute()

          const invoiceId = invoiceQuery?.checkoutSessionId

          if (!invoiceId) {
            return NextResponse.json({ error: "Invoice non trouvé" }, { status: 400 })
          }

          // Envoyer un email de confirmation au client et au professionnel
          const proEmail = await resend.emails.send({
            from: "Biume <noreply@biume.com>",
            to: professionalQuery.email || "",
            subject: "Vous avez une nouvelle réservation",
            react: NewReservationEmailPro({
              customerName: clientQuery.name || "",
              petName: petQuery.name || "",
              serviceName: serviceQuery.name || "",
              date: slotQuery.start.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              time: slotQuery.start.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              providerName: professionalQuery.name || "",
              price: amount,
            }),
          })

          if (proEmail.error) {
            console.error("Erreur lors de l'envoi de l'email au professionnel:", proEmail.error)
          }

          // Envoyer un email de confirmation au client
          const clientEmail = await resend.emails.send({
            from: "Biume <noreply@biume.com>",
            to: clientQuery?.email || "",
            subject: "Vous avez une nouvelle réservation",
            react: ReservationWaitingEmailClient(),
          })

          if (clientEmail.error) {
            console.error("Erreur lors de l'envoi de l'email au client:", clientEmail.error)
          }

          await db.transaction(async tx => {
            await tx
              .update(appointments)
              .set({
                status: "PAYED",
              })
              .where(eq(appointments.id, appointmentId))

            await tx
              .update(organizationSlots)
              .set({
                isAvailable: false,
              })
              .where(eq(organizationSlots.id, slotId))

            await db
              .update(transaction)
              .set({
                status: "COMPLETED",
                updatedAt: new Date(),
              })
              .where(eq(transaction.id, metadata.transactionId))
          })
        } else {
          return NextResponse.json({ error: "Session non trouvée" }, { status: 400 })
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
