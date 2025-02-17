'use server';

import { CreatePetSchema, Pet, pets } from '@/src/db/pets';
import { createServerAction, db, requireAuth } from '../lib';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

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

    revalidatePath(`/dashboard/user/${ctx.user?.id}/pets`);

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
