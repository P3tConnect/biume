"use server"

import { and, desc, eq } from "drizzle-orm"
import { z } from "zod"

import { CreatePetSchema, Pet, pets } from "@/src/db/pets"
import { appointments } from "@/src/db/appointments"

import { ActionError, createServerAction, db, requireAuth, requireFullOrganization } from "../lib"

export const createPet = createServerAction(
  CreatePetSchema,
  async (input, ctx) => {
    const pet = await db
      .insert(pets)
      .values({
        ...input,
        ownerId: ctx.user?.id ?? "",
      })
      .returning()
      .execute()

    if (!pet) {
      throw new Error("Erreur lors de la création de l'animal")
    }

    return pet
  },
  [requireAuth]
)

export const getPets = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const userPets = await db.query.pets.findMany({
      where: eq(pets.ownerId, ctx.user?.id ?? ""),
    })

    if (!userPets) {
      throw new Error("Aucun animal trouvé")
    }

    return userPets as Pet[]
  },
  [requireAuth]
)

export const updatePetDeseases = createServerAction(
  z.object({
    petId: z.string().uuid(),
    deseases: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: p => and(eq(p.id, input.petId), eq(p.ownerId, ctx.user?.id ?? "")),
    })

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas")
    }

    const updatedPet = await db
      .update(pets)
      .set({
        deseases: input.deseases,
        updatedAt: new Date(),
      })
      .where(eq(pets.id, input.petId))
      .returning()
      .execute()

    if (!updatedPet[0]) {
      throw new Error("Erreur lors de la mise à jour des maladies de l'animal")
    }

    return updatedPet[0]
  },
  [requireAuth]
)

export const updatePetAllergies = createServerAction(
  z.object({
    petId: z.string().uuid(),
    allergies: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: p => and(eq(p.id, input.petId), eq(p.ownerId, ctx.user?.id ?? "")),
    })

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas")
    }

    const updatedPet = await db
      .update(pets)
      .set({
        allergies: input.allergies,
        updatedAt: new Date(),
      })
      .where(eq(pets.id, input.petId))
      .returning()
      .execute()

    if (!updatedPet[0]) {
      throw new Error("Erreur lors de la mise à jour des allergies de l'animal")
    }

    return updatedPet[0]
  },
  [requireAuth]
)

export const updatePetIntolerences = createServerAction(
  z.object({
    petId: z.string().uuid(),
    intolerences: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: p => and(eq(p.id, input.petId), eq(p.ownerId, ctx.user?.id ?? "")),
    })

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas")
    }

    const updatedPet = await db
      .update(pets)
      .set({
        intolerences: input.intolerences,
        updatedAt: new Date(),
      })
      .where(eq(pets.id, input.petId))
      .returning()
      .execute()

    if (!updatedPet[0]) {
      throw new Error("Erreur lors de la mise à jour des intolerences de l'animal")
    }

    return updatedPet[0]
  },
  [requireAuth]
)

export const deletePet = createServerAction(
  z.object({
    petId: z.string().uuid(),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: p => and(eq(p.id, input.petId), eq(p.ownerId, ctx.user?.id ?? "")),
    })

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas")
    }

    await db.delete(pets).where(eq(pets.id, input.petId))
  },
  [requireAuth]
)

export const getPetById = createServerAction(
  z.object({
    petId: z.string(),
  }),
  async (input, ctx) => {
    try {
      const pet = await db.query.pets.findFirst({
        where: eq(pets.id, input.petId),
        with: {
          owner: {
            columns: {
              id: true,
              name: true,
              image: true,
              phoneNumber: true,
              email: true,
              address: true,
              country: true,
            },
          },
          appointments: {
            with: {
              slot: {
                columns: {
                  id: true,
                  start: true,
                  end: true,
                },
              },
              service: {
                columns: {
                  id: true,
                  name: true,
                  price: true,
                  duration: true,
                  description: true,
                },
              },
            },
          },
        },
      })
  
      if (!pet) {
        throw new ActionError("L'animal n'existe pas")
      }
  
      console.log(pet, "pet in getPetById")

      return pet as unknown as Pet
    } catch (err) {
      console.error(err)
      throw new ActionError("Erreur lors de la récupération de l'animal")
    }
  },
  [requireAuth]
)

export const updatePet = createServerAction(
  CreatePetSchema.extend({
    id: z.string().uuid(),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: p => and(eq(p.id, input.id), eq(p.ownerId, ctx.user?.id ?? "")),
    })

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas")
    }

    const { id, ...petData } = input

    const updatedPet = await db
      .update(pets)
      .set({
        ...petData,
        updatedAt: new Date(),
      })
      .where(eq(pets.id, id))
      .returning()
      .execute()

    if (!updatedPet[0]) {
      throw new Error("Erreur lors de la mise à jour de l'animal")
    }

    return updatedPet[0]
  },
  [requireAuth]
)

export const getProPatients = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const patients = await db.query.pets.findMany({
      columns: {
        id: true,
        name: true,
        type: true,
        weight: true,
        height: true,
        description: true,
        image: true,
        breed: true,
        gender: true,
        birthDate: true,
        deseases: true,
        allergies: true,
        intolerences: true,
      },
      with: {
        appointments: {
          where: and(eq(appointments.status, "CONFIRMED"), eq(appointments.proId, ctx.fullOrganization?.id ?? "")),
          orderBy: [desc(appointments.createdAt)],
        },
        owner: {
          columns: {
            id: true,
            name: true,
            email: true,
            image: true,
            phoneNumber: true,
          },
        },
      },
    })

    // Ne retourner que les animaux qui ont au moins un rendez-vous confirmé
    return patients.filter(patient => patient.appointments.length > 0) as unknown as Pet[]
  },
  [requireAuth, requireFullOrganization]
)
