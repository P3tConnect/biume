import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { createServerAction, requireAuth, requireMember } from "@/src/lib"

import { db } from "@/src/lib"
import { eq } from "drizzle-orm"
import { pets } from "@/src/db/pets"
import { report } from "@/src/db/report"
import { z } from "zod"

// Définition des schémas pour les animaux (utilisant les pets existants)
export const animalSchemaTypeEnum = z.enum(["DOG", "CAT", "HORSE", "BIRD", "NAC"])

// Schémas Zod pour la validation
export const insertReportSchema = createInsertSchema(report)
export const selectReportSchema = createSelectSchema(report)

// Type AnimalSchema adapté pour représenter un pet comme un schéma
export interface AnimalSchema {
  id: string
  name: string
  description?: string
  type: string
  imageUrl?: string
  svgData?: string
  isDefault?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type Report = z.infer<typeof selectReportSchema>
export type NewReport = z.infer<typeof insertReportSchema>

// Action pour récupérer tous les schémas d'animaux d'une organisation
export const getAnimalSchemasAction = createServerAction(
  z.object({}),
  async (_, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organisation non trouvée")
    }

    // Utiliser les pets comme schémas d'animaux
    const petsData = await db.query.pets.findMany({})

    // Transformer les pets en schémas
    const schemas: AnimalSchema[] = petsData.map(pet => ({
      id: pet.id,
      name: pet.name,
      description: pet.description || undefined,
      type: pet.type,
      imageUrl: pet.image || undefined,
      svgData: "", // Valeur par défaut
      isDefault: false, // Valeur par défaut
      createdAt: pet.createdAt || undefined,
      updatedAt: pet.updatedAt || undefined,
    }))

    return { schemas }
  },
  [requireAuth, requireMember]
)

// Action pour récupérer un schéma d'animal spécifique
export const getAnimalSchemaAction = createServerAction(
  z.object({
    schemaId: z.string(),
  }),
  async (input, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organisation non trouvée")
    }

    const pet = await db.query.pets.findFirst({
      where: eq(pets.id, input.schemaId),
    })

    if (!pet) {
      throw new Error("Schéma non trouvé")
    }

    // Transformer le pet en schéma
    const schema: AnimalSchema = {
      id: pet.id,
      name: pet.name,
      description: pet.description || undefined,
      type: pet.type,
      imageUrl: pet.image || undefined,
      svgData: "", // Valeur par défaut
      isDefault: false, // Valeur par défaut
      createdAt: pet.createdAt || undefined,
      updatedAt: pet.updatedAt || undefined,
    }

    return { schema }
  },
  [requireAuth, requireMember]
)

// Action pour créer un nouveau schéma d'animal (en réalité, crée un pet)
export const createAnimalSchemaAction = createServerAction(
  z.object({
    name: z.string(),
    description: z.string().optional(),
    type: animalSchemaTypeEnum,
    imageUrl: z.string().optional(),
    svgData: z.string(),
    isDefault: z.boolean().optional(),
  }),
  async (input, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organisation non trouvée")
    }

    // Créer un pet à partir des données du schéma
    const newPet = await db
      .insert(pets)
      .values({
        name: input.name,
        description: input.description,
        type:
          input.type === "DOG"
            ? "Dog"
            : input.type === "CAT"
              ? "Cat"
              : input.type === "HORSE"
                ? "Horse"
                : input.type === "BIRD"
                  ? "Bird"
                  : "NAC",
        image: input.imageUrl,
        birthDate: new Date(), // Requis pour un pet
        weight: 0, // Ajoutez une valeur par défaut ou modifiez selon vos besoins
        height: 0, // Ajoutez une valeur par défaut ou modifiez selon vos besoins
        breed: "Inconnu", // Ajoutez une valeur par défaut ou modifiez selon vos besoins
        gender: "Male", // Utilise la valeur par défaut définie dans le schéma
      })
      .returning()

    if (!newPet.length) {
      throw new Error("Erreur lors de la création du schéma")
    }

    // Transformer le pet en schéma
    const schema: AnimalSchema = {
      id: newPet[0].id,
      name: newPet[0].name,
      description: newPet[0].description || undefined,
      type: newPet[0].type,
      imageUrl: newPet[0].image || undefined,
      svgData: input.svgData,
      isDefault: input.isDefault || false,
      createdAt: newPet[0].createdAt || undefined,
      updatedAt: newPet[0].updatedAt || undefined,
    }

    return { schema }
  },
  [requireAuth, requireMember]
)

// Action pour mettre à jour un schéma d'animal
export const updateAnimalSchemaAction = createServerAction(
  z.object({
    id: z.string(),
    data: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      type: animalSchemaTypeEnum.optional(),
      imageUrl: z.string().optional(),
      svgData: z.string().optional(),
      isDefault: z.boolean().optional(),
    }),
  }),
  async (input, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organisation non trouvée")
    }

    // Mettre à jour le pet correspondant
    const updatedPet = await db
      .update(pets)
      .set({
        name: input.data.name,
        description: input.data.description,
        type:
          input.data.type === "DOG"
            ? "Dog"
            : input.data.type === "CAT"
              ? "Cat"
              : input.data.type === "HORSE"
                ? "Horse"
                : input.data.type === "BIRD"
                  ? "Bird"
                  : input.data.type === "NAC"
                    ? "NAC"
                    : undefined,
        image: input.data.imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(pets.id, input.id))
      .returning()

    if (!updatedPet.length) {
      throw new Error("Schéma non trouvé ou non autorisé")
    }

    // Transformer le pet en schéma
    const schema: AnimalSchema = {
      id: updatedPet[0].id,
      name: updatedPet[0].name,
      description: updatedPet[0].description || undefined,
      type: updatedPet[0].type,
      imageUrl: updatedPet[0].image || undefined,
      svgData: input.data.svgData || "",
      isDefault: input.data.isDefault || false,
      createdAt: updatedPet[0].createdAt || undefined,
      updatedAt: updatedPet[0].updatedAt || undefined,
    }

    return { schema }
  },
  [requireAuth, requireMember]
)

// Action pour supprimer un schéma d'animal
export const deleteAnimalSchemaAction = createServerAction(
  z.object({
    schemaId: z.string(),
  }),
  async (input, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organisation non trouvée")
    }

    await db.delete(pets).where(eq(pets.id, input.schemaId))

    return { success: true }
  },
  [requireAuth, requireMember]
)

// Action pour récupérer tous les rapports d'une organisation
export const getReportsAction = createServerAction(
  z.object({
    petId: z.string().optional(),
  }),
  async (input, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organisation non trouvée")
    }

    // Récupérer tous les rapports
    const allReports = await db.query.report.findMany({
      with: {
        appointments: true,
        topics: true,
      },
    })

    // Si petId est fourni, filtrer les rapports côté application
    // en utilisant patientId dans appointments qui correspond au petId
    const reports = input.petId ? allReports.filter(r => r.appointments?.patientId === input.petId) : allReports

    return { reports }
  },
  [requireAuth, requireMember]
)

// Action pour récupérer un rapport spécifique
export const getReportAction = createServerAction(
  z.object({
    reportId: z.string(),
  }),
  async (input, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organisation non trouvée")
    }

    const reportData = await db.query.report.findFirst({
      where: eq(report.id, input.reportId),
      with: {
        appointments: true,
        topics: true,
      },
    })

    if (!reportData) {
      throw new Error("Rapport non trouvé")
    }

    return { report: reportData }
  },
  [requireAuth, requireMember]
)

// Action pour créer un nouveau rapport
export const createReportAction = createServerAction(
  insertReportSchema,
  async (input, ctx) => {
    if (!ctx.organization || !ctx.user) {
      throw new Error("Organisation ou utilisateur non trouvé")
    }

    const newReport = await db
      .insert(report)
      .values({
        ...input,
      })
      .returning()

    return { report: newReport[0] }
  },
  [requireAuth, requireMember]
)

// Action pour mettre à jour un rapport
export const updateReportAction = createServerAction(
  z.object({
    id: z.string(),
    data: insertReportSchema.partial(),
  }),
  async (input, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organisation non trouvée")
    }

    const updatedReport = await db
      .update(report)
      .set({
        ...input.data,
        updatedAt: new Date(),
      })
      .where(eq(report.id, input.id))
      .returning()

    if (!updatedReport.length) {
      throw new Error("Rapport non trouvé ou non autorisé")
    }

    return { report: updatedReport[0] }
  },
  [requireAuth, requireMember]
)

// Action pour supprimer un rapport
export const deleteReportAction = createServerAction(
  z.object({
    reportId: z.string(),
  }),
  async (input, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organisation non trouvée")
    }

    await db.delete(report).where(eq(report.id, input.reportId))

    return { success: true }
  },
  [requireAuth, requireMember]
)
