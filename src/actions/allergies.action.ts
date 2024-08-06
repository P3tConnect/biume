"use server";

import { z } from "zod";
import { userAction } from "../lib/action";
import { CreateAllergySchema } from "../db";

export const getAllergies = userAction.action(async () => {});

export const createAllergy = userAction
  .schema(CreateAllergySchema)
  .action(async ({ parsedInput }) => {});

export const updateAllergy = userAction
  .schema(CreateAllergySchema)
  .action(async ({ parsedInput }) => {});

export const deleteAllergy = userAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
