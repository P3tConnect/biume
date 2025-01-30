"use server";

import { CreateAllergySchema, allergies } from "../db";

import { ActionError } from "../lib";
import { authedAction } from "../lib";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const getAllergies = authedAction.action(async () => {
  const data = await db.query.allergies.findMany();

  if (!data) {
    throw new ActionError("Allergies not found");
  }

  return data;
});

export const createAllergy = authedAction
  .schema(CreateAllergySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(allergies)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Allergy not created");
    }

    return data;
  });

export const updateAllergy = authedAction
  .schema(CreateAllergySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(allergies)
      .set(parsedInput)
      .where(eq(allergies.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Allergy not updated");
    }

    return data;
  });

export const deleteAllergy = authedAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(allergies)
      .where(eq(allergies.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("Allergy not deleted");
    }
  });
