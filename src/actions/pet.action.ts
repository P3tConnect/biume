'use server';

import { CreatePetSchema, Pet, pets } from '@/src/db/pets';
import { createServerAction, db, requireAuth } from '../lib';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';

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

export const updatePetDeseases = createServerAction(
  z.object({
    petId: z.string().uuid(),
    deseases: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: (p) =>
        and(eq(p.id, input.petId), eq(p.ownerId, ctx.user?.id ?? '')),
    });

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas");
    }

    const updatedPet = await db
      .update(pets)
      .set({
        deseases: input.deseases,
        updatedAt: new Date(),
      })
      .where(eq(pets.id, input.petId))
      .returning()
      .execute();

    if (!updatedPet[0]) {
      throw new Error("Erreur lors de la mise à jour des maladies de l'animal");
    }

    return updatedPet[0];
  },
  [requireAuth]
);

export const updatePetAllergies = createServerAction(
  z.object({
    petId: z.string().uuid(),
    allergies: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: (p) =>
        and(eq(p.id, input.petId), eq(p.ownerId, ctx.user?.id ?? '')),
    });

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas");
    }

    const updatedPet = await db
      .update(pets)
      .set({
        allergies: input.allergies,
        updatedAt: new Date(),
      })
      .where(eq(pets.id, input.petId))
      .returning()
      .execute();

    if (!updatedPet[0]) {
      throw new Error(
        "Erreur lors de la mise à jour des allergies de l'animal"
      );
    }

    return updatedPet[0];
  },
  [requireAuth]
);

export const updatePetIntolerences = createServerAction(
  z.object({
    petId: z.string().uuid(),
    intolerences: z.array(z.string()),
  }),
  async (input, ctx) => {
    const pet = await db.query.pets.findFirst({
      where: (p) =>
        and(eq(p.id, input.petId), eq(p.ownerId, ctx.user?.id ?? '')),
    });

    if (!pet) {
      throw new Error("L'animal n'existe pas ou ne vous appartient pas");
    }

    const updatedPet = await db
      .update(pets)
      .set({
        intolerences: input.intolerences,
        updatedAt: new Date(),
      })
      .where(eq(pets.id, input.petId))
      .returning()
      .execute();

    if (!updatedPet[0]) {
      throw new Error(
        "Erreur lors de la mise à jour des intolerences de l'animal"
      );
    }

    return updatedPet[0];
  },
  [requireAuth]
);
