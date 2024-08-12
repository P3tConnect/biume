"use server";

import { z } from "zod";
import { ActionError, userAction } from "../lib/action";
import { allergies, CreateAllergySchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getAllergies = userAction.action(async () => {
  const data = await db.query.allergies.findMany();

  if (!data) {
    throw new ActionError("Allergies not found");
  }

  return data;
});

export const createAllergy = userAction
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

export const updateAllergy = userAction
  .schema(CreateAllergySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(allergies)
      .set(parsedInput)
      .where(eq(allergies.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Allergy not updated");
    }

    return data;
  });

export const deleteAllergy = userAction
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
