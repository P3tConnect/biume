"use server"

import { z } from "zod"

import { appointments } from "../db/appointments"
import { createServerAction } from "../lib"
import { db } from "../lib"
import { requireAuth, requireFullOrganization } from "../lib/action"

// Schéma de validation pour la création d'un rendez-vous
const createAppointmentSchema = z.object({
  clientId: z.string(),
  patientId: z.string(),
  serviceId: z.string(),
  date: z.date(),
  startTime: z.string(),
  duration: z.number().min(15),
  atHome: z.boolean().default(false),
  notes: z.string().optional(),
  beginAt: z.date(),
  endAt: z.date(),
})

// Action serveur pour créer un rendez-vous
export const createAppointmentAction = createServerAction(
  createAppointmentSchema,
  async (input, ctx) => {
    try {
      // Création du rendez-vous dans la base de données
      const appointment = await db
        .insert(appointments)
        .values({
          proId: ctx.organization?.id,
          clientId: input.clientId,
          patientId: input.patientId,
          serviceId: input.serviceId,
          beginAt: input.beginAt,
          endAt: input.endAt,
          atHome: input.atHome,
          status: "PENDING PAYMENT",
        })
        .returning()

      if (!appointment || appointment.length === 0) {
        throw new Error("Échec lors de la création du rendez-vous")
      }

      return {
        success: true,
        data: appointment[0],
      }
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous:", error)
      throw new Error("Une erreur est survenue lors de la création du rendez-vous")
    }
  },
  [requireAuth, requireFullOrganization]
)
