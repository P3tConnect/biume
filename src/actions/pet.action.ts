'use server';

import { CreatePetSchema, Pet, pets } from '@/src/db/pets';
import { createServerAction, db, requireAuth } from '../lib';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { petsAllergies, petsDeseases, petsIntolerences } from '../db';

export const createPet = createServerAction(
  CreatePetSchema,
  async (input, ctx) => {
    const pet = await db
      .insert(pets)
      .values({
        ...input,
        ownerId: ctx.user?.id ?? '',
      })
      .returning()
      .execute();

    if (!pet) {
      throw new Error("Erreur lors de la création de l'animal");
    }

    return pet;
  },
  [requireAuth]
);

export const getPets = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const userPets = await db.query.pets.findMany({
      where: eq(pets.ownerId, ctx.user?.id ?? ''),
    });

    if (!userPets) {
      throw new Error('Aucun animal trouvé');
    }

    return userPets as unknown as Pet[];
  },
  [requireAuth]
);

export const createPetDeseases = createServerAction(
  z.object({
    petId: z.string(),
    diseases: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: (pets) =>
        eq(pets.id, input.petId) && eq(pets.ownerId, ctx.user?.id ?? ''),
    });

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas");
    }

    const createdDiseases = await db
      .insert(petsDeseases)
      .values(
        input.diseases.map((disease) => ({
          petId: input.petId,
          name: disease,
        }))
      )
      .returning()
      .execute();

    if (!createdDiseases) {
      throw new Error('Erreur lors de la création des maladies');
    }

    return createdDiseases;
  },
  [requireAuth]
);

export const createPetAllergies = createServerAction(
  z.object({
    petId: z.string(),
    allergies: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: (pets) =>
        eq(pets.id, input.petId) && eq(pets.ownerId, ctx.user?.id ?? ''),
    });

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas");
    }

    const createdAllergies = await db
      .insert(petsAllergies)
      .values(
        input.allergies.map((allergy) => ({
          petId: input.petId,
          name: allergy,
        }))
      )
      .returning()
      .execute();

    if (!createdAllergies) {
      throw new Error('Erreur lors de la création des maladies');
    }

    return createdAllergies;
  },
  [requireAuth]
);

export const createPetIntolerances = createServerAction(
  z.object({
    petId: z.string(),
    allergies: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: (pets) =>
        eq(pets.id, input.petId) && eq(pets.ownerId, ctx.user?.id ?? ''),
    });

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas");
    }

    const createdIntolerences = await db
      .insert(petsIntolerences)
      .values(
        input.allergies.map((allergy) => ({
          petId: input.petId,
          name: allergy,
        }))
      )
      .returning()
      .execute();

    if (!createdIntolerences) {
      throw new Error('Erreur lors de la création des maladies');
    }

    return createdIntolerences;
  },
  [requireAuth]
);
