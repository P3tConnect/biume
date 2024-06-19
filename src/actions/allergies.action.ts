"use server";

import { z } from "zod";
import { ActionError, userAction } from "../utils/action";
import { CreateAllergySchema, allergies } from "../db";
import { db } from "../utils/db";
import { eq } from "drizzle-orm";

export async function getAllergies() {
  const res = await db.query.allergies.findMany();

  return res;
}

export const createAllergy = userAction(
  CreateAllergySchema,
  async (params, _) => {
    const res = await db.insert(allergies).values(params);

    if (!res) {
      throw new ActionError("Failed to create allergy");
    }
  },
);

export const updateAllergy = userAction(
  CreateAllergySchema,
  async (params, _) => {
    const res = await db
      .update(allergies)
      .set(params)
      .where(eq(allergies, params.id));
  },
);

export const deleteAllergy = userAction(z.string(), async (params, _) => {});
