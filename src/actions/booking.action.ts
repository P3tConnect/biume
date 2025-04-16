"use server"

import { z } from "zod"
import { createServerAction, ActionError, requireAuth, resend } from "../lib"
import { db } from "../lib"
import {
  transaction,
  service,
  appointments,
  appointmentOptions,
  organizationSlots,
  pets,
  organization,
  Service,
  OrganizationSlots,
  Organization,
  Pet,
} from "../db"
import { eq, inArray } from "drizzle-orm"
import ReservationWaitingEmailClient from "@/emails/ReservationWaitingEmailClient"
import NewReservationEmailPro from "@/emails/NewReservationEmailPro"
import { petAppointments } from "../db/pet_appointments"
import { tasks } from "@trigger.dev/sdk/v3"
import type {
  sendAppointmentEmails,
  scheduleRatingEmail,
  scheduleOTPReminder,
} from "../trigger/appointmentEmails.trigger"

// Schéma de validation pour la création d'un rendez-vous (similaire à celui du paiement)
const createBookingSchema = z.object({
  service: z.object({
    id: z.string(),
    places: z.number().optional(),
  }),
  professionalId: z.string(),
  isHomeVisit: z.boolean().default(false),
  additionalInfo: z.string().optional(),
  selectedOptions: z.array(z.string()).optional(),
  selectedPets: z.array(z.string()).optional(),
  amount: z.number(),
  companyId: z.string(),
  status: z.enum(["PENDING PAYMENT", "SCHEDULED", "CANCELED", "CONFIRMED"]).default("SCHEDULED"),
  isPaid: z.boolean().default(false),
  slot: z.object({
    id: z.string(),
    start: z.date(),
    remainingPlaces: z.number(),
  }),
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
      const [newTransaction] = await db
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
        .execute()

      if (!newTransaction) {
        throw new ActionError("Impossible de créer la transaction")
      }

      // Récupérer les informations du service pour obtenir sa durée
      const selectedService = await db.query.service.findFirst({
        where: eq(service.id, input.service.id),
      })

      if (!selectedService) {
        throw new ActionError("Service non trouvé")
      }

      // Vérification du type de service et du nombre de places disponibles
      if (input.selectedPets && input.selectedPets.length > 1) {
        if (selectedService.type !== "MULTIPLE") {
          throw new ActionError("Ce service ne permet pas les réservations multiples")
        }

        if (!selectedService.places) {
          throw new ActionError("Le nombre de places n'est pas défini pour ce service")
        }

        if (input.slot.remainingPlaces < input.selectedPets.length) {
          throw new ActionError("Il n'y a pas assez de places disponibles pour tous les animaux")
        }
      }

      // Créer le rendez-vous avec le statut spécifié (SCHEDULED par défaut)
      const [appointment] = await db
        .insert(appointments)
        .values({
          serviceId: input.service.id,
          proId: input.companyId,
          clientId: ctx.user?.id ?? "",
          payedOnline: false,
          slotId: input.slot.id,
          status: input.status,
          atHome: input.isHomeVisit,
          type: selectedService.type == "MULTIPLE" ? "multiple" : "oneToOne",
        })
        .returning()
        .execute()

      if (!appointment) {
        throw new ActionError("Impossible de créer le rendez-vous")
      }

      // Si des options ont été sélectionnées, les enregistrer
      if (input.selectedOptions && input.selectedOptions.length > 0) {
        await db.insert(appointmentOptions).values(
          input.selectedOptions.map((option: string) => ({
            appointmentId: appointment.id,
            optionId: option,
          }))
        )
      }

      if (input.selectedPets && input.selectedPets.length > 0) {
        await db
          .insert(petAppointments)
          .values(
            input.selectedPets.map((pet: string) => ({
              petId: pet,
              appointmentId: appointment.id,
            }))
          )
          .returning()
          .execute()
      }

      // Mise à jour du nombre de places disponibles
      const numberOfPets = input.selectedPets?.length || 1
      const newRemainingPlaces = input.slot.remainingPlaces - numberOfPets

      await db
        .update(organizationSlots)
        .set({
          remainingPlaces: newRemainingPlaces,
          isAvailable: newRemainingPlaces > 0,
        })
        .where(eq(organizationSlots.id, input.slot.id))
        .execute()

      const transactionQuery = await db.transaction(async tx => {
        const petQuery = (await tx.query.pets.findMany({
          where: inArray(pets.id, input.selectedPets ?? []),
          columns: {
            name: true,
            image: true,
          },
        })) as Pet[]

        const serviceQuery = (await tx.query.service.findFirst({
          where: eq(service.id, input.service.id),
          columns: {
            name: true,
          },
        })) as Service

        const slotQuery = (await tx.query.organizationSlots.findFirst({
          where: eq(organizationSlots.id, input.slot.id),
          columns: {
            start: true,
          },
        })) as OrganizationSlots

        const professionalQuery = (await tx.query.organization.findFirst({
          where: eq(organization.id, input.companyId),
          columns: {
            name: true,
          },
        })) as Organization

        return {
          petQuery,
          serviceQuery,
          slotQuery,
          professionalQuery,
        }
      })

      const { petQuery, serviceQuery, slotQuery, professionalQuery } = transactionQuery

      // Formater les données pour l'affichage
      const formattedDate = slotQuery.start.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      const formattedTime = slotQuery.start.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })

      // Remplacer les appels directs à resend par l'utilisation de la tâche Trigger.dev
      try {
        await tasks.trigger<typeof sendAppointmentEmails>("send-appointment-emails", {
          clientName: ctx.user?.name || "Client",
          clientEmail: ctx.user?.email || "",
          professionalName: professionalQuery?.name || "Professionnel",
          professionalEmail: professionalQuery.email || "",
          petNames: petQuery.map(pet => pet.name),
          serviceName: serviceQuery.name || "",
          appointmentDate: formattedDate,
          appointmentTime: formattedTime,
          price: input.amount.toString(),
          appointmentId: appointment.id,
        })

        console.log("Tâche d'envoi des emails déclenchée avec succès")

        // Planifier l'envoi d'un email d'évaluation 2 jours après le rendez-vous
        await tasks.trigger<typeof scheduleRatingEmail>("schedule-rating-email", {
          clientName: ctx.user?.name || "Client",
          clientEmail: ctx.user?.email || "",
          professionalName: professionalQuery?.name || "Professionnel",
          serviceName: serviceQuery.name || "",
          appointmentDate: formattedDate,
          appointmentId: appointment.id,
        })

        console.log("Tâche de planification d'email d'évaluation déclenchée avec succès")

        // Planifier l'envoi d'un code OTP 1 heure avant le rendez-vous
        await tasks.trigger<typeof scheduleOTPReminder>("schedule-otp-reminder", {
          clientId: ctx.user?.id || "",
          clientName: ctx.user?.name || "Client",
          clientEmail: ctx.user?.email || "",
          clientPhone: ctx.user?.phoneNumber || "",
          professionalName: professionalQuery?.name || "Professionnel",
          serviceName: serviceQuery.name || "",
          appointmentDate: formattedDate,
          appointmentTime: formattedTime,
          appointmentId: appointment.id,
          // Les préférences seront récupérées depuis la BDD si non fournies
        })

        console.log("Tâche de planification de l'envoi du code OTP déclenchée avec succès")
      } catch (emailError) {
        console.error("Erreur lors du déclenchement de la tâche d'envoi des emails:", emailError)
        // Ne pas bloquer le processus si l'envoi d'email échoue
      }

      return {
        success: true,
        appointmentId: appointment.id,
        transactionId: newTransaction.id,
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
