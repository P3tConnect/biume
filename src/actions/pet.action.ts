'use server';

import { CreatePetSchema, Pet, pets } from '@/src/db/pets';
import { createServerAction, db, requireAuth } from '../lib';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { allergies, deseases, intolerences } from '../db';

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

    return userPets as Pet[];
  },
  [requireAuth]
);

export const createPetDeseases = createServerAction(
  z.object({
    pets: z.string(),
    deseases: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: (pets) =>
        eq(pets.id, input.pets) && eq(pets.ownerId, ctx.user?.id ?? ''),
    });

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas");
    }

    const createdDeseases = await db
      .insert(deseases)
      .values(
        input.deseases.map(() => ({
          name: '',
          description: '',
          pets: pet?.id,
          ownerId: ctx.user?.id ?? '',
          owner: ctx.user?.name ?? '',
        }))
      )
      .returning()
      .execute();

    if (!createdDeseases) {
      throw new Error('Erreur lors de la création des maladies');
    }

    return createdDeseases;
  },
  [requireAuth]
);

export const createPetAllergies = createServerAction(
  z.object({
    pets: z.string(),
    allergies: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: (pets) =>
        eq(pets.id, input.pets) && eq(pets.ownerId, ctx.user?.id ?? ''),
    });

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas");
    }

    const createdAllergies = await db
      .insert(allergies)
      .values(
        input.allergies.map((allergy) => ({
          name: allergy,
          description: '',
          pets: pet?.id,
          ownerId: ctx.user?.id ?? '',
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
    pets: z.string(),
    intolerences: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: (pets) =>
        eq(pets.id, input.pets) && eq(pets.ownerId, ctx.user?.id ?? ''),
    });

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas");
    }

    const createdIntolerences = await db
      .insert(intolerences)
      .values(
        input.intolerences.map((intolerance) => ({
          name: intolerance,
          description: '',
          pets: pet?.id,
          ownerId: ctx.user?.id ?? '',
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
