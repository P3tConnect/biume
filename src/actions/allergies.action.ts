"use server";

import { z } from "zod";
import { authedAction } from "../lib/action";
import { allergies, CreateAllergySchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getAllergies = authedAction.handler(async () => {
  const data = await db.query.allergies.findMany();

  if (!data) {
    throw new ZSAError("NOT_FOUND", "Allergies not found");
  }

  return data;
});

export const createAllergy = authedAction
  .input(CreateAllergySchema)
  .handler(async ({ input }) => {
    const data = await db.insert(allergies).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Allergy not created");
    }

    return data;
  });

export const updateAllergy = authedAction
  .input(CreateAllergySchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(allergies)
      .set(input)
      .where(eq(allergies.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Allergy not updated");
    }

    return data;
  });

export const deleteAllergy = authedAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(allergies)
      .where(eq(allergies.id, input))
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Allergy not deleted");
    }
  });
