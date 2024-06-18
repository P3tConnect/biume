"use server";

import { z } from "zod";
import { userAction } from "../utils/action";
import { CreateAllergySchema } from "../db";

export async function getAllergies() {}

export const createAllergy = userAction(
    CreateAllergySchema,
    async (params, _) => {},
);

export const updateAllergy = userAction(
    CreateAllergySchema,
    async (params, _) => {},
);

export const deleteAllergy = userAction(z.string(), async (params, _) => {});
