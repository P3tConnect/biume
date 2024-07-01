"use server";

import { z } from "zod";
import { ActionError, userAction } from "../utils/action";
import { CreateAllergySchema, allergies } from "../db";
// import { db } from "../utils/db";
import { eq } from "drizzle-orm";

export async function getAllergies() {
  // const res = await db.query.allergies.findMany();
  // return res;
}

export const createAllergy = userAction
  .schema(CreateAllergySchema)
  .action(async ({ parsedInput }) => {});

export const updateAllergy = userAction
  .schema(CreateAllergySchema)
  .action(async ({ parsedInput }) => {});

export const deleteAllergy = userAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
