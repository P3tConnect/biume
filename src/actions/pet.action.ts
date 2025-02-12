'use server';

import { CreatePetSchema, pets } from '@/src/db/pets';
import { createServerAction, db, requireAuth } from '../lib';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const createPet = createServerAction(
  CreatePetSchema,
  async (input, ctx) => {
    if (!ctx.user?.id) {
      throw new Error('Vous devez être connecté pour créer un animal');
    }

    try {
      const pet = await db
        .insert(pets)
        .values({
          ...input,
          birthDate: new Date(input.birthDate),
          ownerId: ctx.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning()
        .execute();

      return pet;
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      throw new Error("Erreur lors de la création de l'animal");
    }
  },
  [requireAuth]
);

export const getPets = createServerAction(
  z.object({}),
  async (input, ctx) => {
    if (!ctx.user?.id) {
      throw new Error('Vous devez être connecté pour voir vos animaux');
    }

    try {
      const userPets = await db
        .select()
        .from(pets)
        .where(eq(pets.ownerId, ctx.user.id));

      return userPets;
    } catch (error) {
      console.error('Erreur lors de la récupération:', error);
      throw new Error('Erreur lors de la récupération des animaux');
    }
  },
  [requireAuth]
);
