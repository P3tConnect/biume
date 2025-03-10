"use server"

import { z } from "zod"
import { createServerAction, ActionError, requireAuth } from "../lib"
import { db } from "../lib"
import { transaction, service, options, appointments, appointmentStatusType } from "../db"
import { eq, inArray } from "drizzle-orm"

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
      const appointment = await db
        .insert(appointments)
        .values({
          serviceId: input.serviceId,
          proId: input.companyId,
          patientId: input.petId,
          slotId: input.slotId,
          status: input.status,
          atHome: input.isHomeVisit,
          type: "oneToOne",
          // Pas de champ 'notes' dans le schéma
        })
        .returning()

      if (!appointment || appointment.length === 0) {
        throw new ActionError("Impossible de créer le rendez-vous")
      }

      // Si des options ont été sélectionnées, les enregistrer
      if (input.selectedOptions && input.selectedOptions.length > 0) {
        // Ici, ajouter le code pour enregistrer les options sélectionnées
        // en lien avec le rendez-vous (selon votre modèle de données)
      }

      return {
        success: true,
        appointmentId: appointment[0].id,
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
