"use server";

import { z } from "zod";
import { authedAction, db, ActionError } from "../lib";
import { CreatePetSchema, pets } from "../db";
import { eq } from "drizzle-orm";

export const getPets = authedAction.action(async () => {});

export const createPet = authedAction
  .schema(CreatePetSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(pets)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Pet not created");
    }

    return data;
  });

export const updatePet = authedAction
  .schema(CreatePetSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(pets)
      .set(parsedInput)
      .where(eq(pets.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Pet not updated");
    }

    return data;
  });

export const deletePet = authedAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(pets)
      .where(eq(pets.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Pet not deleted");
    }
  });
