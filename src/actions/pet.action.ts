'use server';

import { CreatePetSchema, Pet, pets } from '@/src/db/pets';
import { createServerAction, db, requireAuth } from '../lib';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { CreatePetsDeseaseSchema, petsDeseases } from '../db/petsDeseases';
import { CreatePetsAllergySchema, petsAllergies } from '../db/petsAllergies';
import {
  CreatePetsIntolerenceSchema,
  petsIntolerences,
} from '../db/petsIntolerences';

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

export const createPetWithHealthInfo = createServerAction(
  z.object({
    pet: CreatePetSchema,
    deseases: z.array(CreatePetsDeseaseSchema),
    allergies: z.array(CreatePetsAllergySchema),
    intolerences: z.array(CreatePetsIntolerenceSchema),
  }),
  async (input, ctx) => {
    const pet = await db.transaction(async (tx) => {
      // Créer l'animal
      const [newPet] = await tx
        .insert(pets)
        .values({
          ...input.pet,
          ownerId: ctx.user?.id ?? '',
        })
        .returning();

      if (!newPet) {
        throw new Error("Erreur lors de la création de l'animal");
      }

      // Ajouter les maladies
      if (input.deseases.length > 0) {
        await tx.insert(petsDeseases).values(
          input.deseases.map((desease) => ({
            petId: newPet.id,
            deseaseId: desease.deseaseId,
          }))
        );
      }

      // Ajouter les allergies
      if (input.allergies.length > 0) {
        await tx.insert(petsAllergies).values(
          input.allergies.map((allergy) => ({
            petId: newPet.id,
            allergyId: allergy.allergyId,
          }))
        );
      }

      // Ajouter les intolérances
      if (input.intolerences.length > 0) {
        await tx.insert(petsIntolerences).values(
          input.intolerences.map((intolerence) => ({
            petId: newPet.id,
            intolerenceId: intolerence.intolerenceId,
          }))
        );
      }

      return newPet;
    });

    return pet;
  },
  [requireAuth]
);
