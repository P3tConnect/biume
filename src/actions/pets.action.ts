"use server";

import { z } from "zod";
import { ActionError, userAction } from "../lib/action";
import { CreatePetSchema, pets } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getPets = userAction.action(async () => {});

export const createPet = userAction
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

export const updatePet = userAction
  .schema(CreatePetSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(pets)
      .set(parsedInput)
      .where(eq(pets.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Pet not updated");
    }

    return data;
  });

export const deletePet = userAction
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
