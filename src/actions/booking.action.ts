"use server"

import { z } from "zod"
import { createServerAction, ActionError, requireAuth, resend } from "../lib"
import { db } from "../lib"
import {
  transaction,
  service,
  options,
  appointments,
  appointmentStatusType,
  appointmentOptions,
  organizationSlots,
  pets,
  organization,
} from "../db"
import { eq, inArray } from "drizzle-orm"
import ReservationWaitingEmailClient from "@/emails/ReservationWaitingEmailClient"
import NewReservationEmailPro from "@/emails/NewReservationEmailPro"

// Schéma de validation pour la création d'un rendez-vous (similaire à celui du paiement)
const createBookingSchema = z.object({
  serviceId: z.string(),
  professionalId: z.string(),
  petId: z.string(),
  isHomeVisit: z.boolean().default(false),
  additionalInfo: z.string().optional(),
  selectedOptions: z.array(z.string()).optional(),
  amount: z.number(),
  companyId: z.string(),
  status: z.enum(["PENDING PAYMENT", "SCHEDULED", "CANCELED", "CONFIRMED"]).default("SCHEDULED"),
  isPaid: z.boolean().default(false),
  slotId: z.string().optional(),
})

/**
 * Action serveur pour créer un rendez-vous sans paiement en ligne immédiat
 */
export const createBooking = createServerAction(
  createBookingSchema,
  async (input, ctx) => {
    try {
      // Générer un ID de transaction interne
      const transactionId = `tr_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

      // Créer une transaction dans la base de données avec status "AWAITING_PAYMENT"
      const newTransaction = await db
        .insert(transaction)
        .values({
          intentId: transactionId,
          amount: input.amount,
          status: "AWAITING_PAYMENT", // Le paiement sera effectué sur place
          from: ctx.user?.id,
          to: input.companyId,
          createdAt: new Date(),
        })
        .returning()

      if (!newTransaction || newTransaction.length === 0) {
        throw new ActionError("Impossible de créer la transaction")
      }

      // Récupérer les informations du service pour obtenir sa durée
      const selectedService = await db.query.service.findFirst({
        where: eq(service.id, input.serviceId),
      })

      if (!selectedService) {
        throw new ActionError("Service non trouvé")
      }

      // Créer le rendez-vous avec le statut spécifié (SCHEDULED par défaut)
      const [appointment] = await db
        .insert(appointments)
        .values({
          serviceId: input.serviceId,
          proId: input.companyId,
          patientId: input.petId,
          clientId: ctx.user?.id ?? "",
          payedOnline: false,
          slotId: input.slotId,
          status: input.status,
          atHome: input.isHomeVisit,
          type: "oneToOne",
        })
        .returning()
        .execute()

      if (!appointment) {
        throw new ActionError("Impossible de créer le rendez-vous")
      }

      // Si des options ont été sélectionnées, les enregistrer
      if (input.selectedOptions && input.selectedOptions.length > 0) {
        await db.insert(appointmentOptions).values(
          input.selectedOptions.map(option => ({
            appointmentId: appointment.id,
            optionId: option,
          }))
        )
      }

      await db
        .update(organizationSlots)
        .set({
          isAvailable: false,
        })
        .where(eq(organizationSlots.id, input.slotId ?? ""))
        .execute()

      const petQuery = await db.query.pets
        .findFirst({
          where: eq(pets.id, input.petId),
          columns: {
            name: true,
          },
        })
        .execute()

      const serviceQuery = await db.query.service
        .findFirst({
          where: eq(service.id, input.serviceId),
          columns: {
            name: true,
          },
        })
        .execute()

      const slotQuery = await db.query.organizationSlots
        .findFirst({
          where: eq(organizationSlots.id, input.slotId ?? ""),
          columns: {
            start: true,
          },
        })
        .execute()

      const professionalQuery = await db.query.organization
        .findFirst({
          where: eq(organization.id, input.companyId),
          columns: {
            name: true,
          },
        })
        .execute()

      const proEmail = await resend.emails.send({
        from: "Biume <noreply@biume.com>",
        to: input.companyId,
        subject: "Vous avez une nouvelle réservation",
        react: NewReservationEmailPro({
          customerName: ctx.user?.name || "",
          petName: petQuery?.name || "",
          serviceName: serviceQuery?.name || "",
          date: slotQuery?.start.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })!,
          time: slotQuery?.start.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })!,
          providerName: professionalQuery?.name || "",
          price: input.amount.toString(),
        }),
      })

      if (proEmail.error) {
        console.error("Erreur lors de l'envoi de l'email au professionnel:", proEmail.error)
      }

      // TODO: Envoyer un email de confirmation au client et au professionnel
      const clientEmail = await resend.emails.send({
        from: "Biume <noreply@biume.com>",
        to: ctx.user?.email || "",
        subject: "Vous avez une nouvelle réservation",
        react: ReservationWaitingEmailClient(),
      })

      if (clientEmail.error) {
        console.error("Erreur lors de l'envoi de l'email au client:", clientEmail.error)
      }

      return {
        success: true,
        appointmentId: appointment.id,
        transactionId: newTransaction[0].id,
      }
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous:", error)
      return {
        success: false,
        error: `Une erreur est survenue lors de la création du rendez-vous: ${error}`,
      }
    }
  },
  [requireAuth] // Nécessite que l'utilisateur soit connecté
)
