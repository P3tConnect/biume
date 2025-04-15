"use server"

import { z } from "zod"
import { v4 as uuidv4 } from "uuid"
import { createServerAction, requireAuth, requireFullOrganization, ActionError } from "@/src/lib"
import { db } from "@/src/lib/db"
import { prescription, createPrescriptionSchema } from "@/src/db/prescription"
import { prescriptionItems, createPrescriptionItemsSchema, PrescriptionItem } from "@/src/db/prescriptionItems"
import { eq } from "drizzle-orm"

// Schema pour la création d'un item de prescription
const PrescriptionItemInputSchema = z.object({
  name: z.string().min(1, "Le nom du médicament est requis"),
  dosage: z.string().min(1, "Le dosage est requis"),
  frequency: z.string().min(1, "La fréquence est requise"),
  duration: z.string().min(1, "La durée est requise"),
  notes: z.string().optional(),
})

type PrescriptionItemInput = z.infer<typeof PrescriptionItemInputSchema>

// Schema pour la création d'une prescription complète
const CreatePrescriptionSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  petId: z.string().min(1, "L'animal est requis"),
  description: z.string().optional(),
  appointmentId: z.string().optional(),
  items: z.array(PrescriptionItemInputSchema).min(1, "Au moins un médicament est requis"),
})

// Action pour créer une prescription avec ses items
export const createPrescriptionAction = createServerAction(
  CreatePrescriptionSchema,
  async (input, ctx) => {
    try {
      // Vérifier que le professionnel existe
      if (!ctx.organization?.id) {
        throw new ActionError("Organisation non trouvée")
      }

      // Créer la prescription
      const [newPrescription] = await db
        .insert(prescription)
        .values({
          title: input.title,
          description: input.description,
          createdBy: ctx.organization.id,
        })
        .returning()
        .execute()

      if (!newPrescription) {
        throw new ActionError("Erreur lors de la création de la prescription")
      }

      // Créer les items de prescription
      const prescriptionItemsData = input.items.map((item: PrescriptionItem) => ({
        prescriptionId: newPrescription.id,
        name: item.name,
        dosage: item.dosage,
        frequency: item.frequency,
        duration: item.duration,
        notes: item.notes || null,
      }))

      const createdItems = await db.insert(prescriptionItems).values(prescriptionItemsData).returning().execute()

      return {
        prescription: newPrescription,
        items: createdItems,
      }
    } catch (error) {
      console.error("Erreur lors de la création de la prescription:", error)
      if (error instanceof ActionError) {
        throw error
      }
      throw new ActionError("Une erreur est survenue lors de la création de la prescription")
    }
  },
  [requireAuth, requireFullOrganization]
)

// Action pour récupérer une prescription par son ID
export const getPrescriptionByIdAction = createServerAction(
  z.object({
    prescriptionId: z.string(),
  }),
  async (input, ctx) => {
    try {
      const prescriptionData = await db.query.prescription.findFirst({
        where: eq(prescription.id, input.prescriptionId),
        with: {
          items: true,
          createdBy: true,
        },
      })

      if (!prescriptionData) {
        throw new ActionError("Prescription non trouvée")
      }

      return prescriptionData
    } catch (error) {
      console.error("Erreur lors de la récupération de la prescription:", error)
      if (error instanceof ActionError) {
        throw error
      }
      throw new ActionError("Une erreur est survenue lors de la récupération de la prescription")
    }
  },
  [requireAuth]
)

// Action pour récupérer toutes les prescriptions d'une organisation
export const getOrganizationPrescriptionsAction = createServerAction(
  z.object({}),
  async (input, ctx) => {
    try {
      if (!ctx.organization?.id) {
        throw new ActionError("Organisation non trouvée")
      }

      const prescriptions = await db.query.prescription.findMany({
        where: eq(prescription.createdBy, ctx.organization.id),
        with: {
          items: true,
        },
      })

      return prescriptions
    } catch (error) {
      console.error("Erreur lors de la récupération des prescriptions:", error)
      if (error instanceof ActionError) {
        throw error
      }
      throw new ActionError("Une erreur est survenue lors de la récupération des prescriptions")
    }
  },
  [requireAuth, requireFullOrganization]
)
