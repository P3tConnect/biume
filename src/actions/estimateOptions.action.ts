"use server";

import { z } from "zod";
import { CreateEstimateOptionSchema } from "../db";
import { proAction } from "../utils/action";

export async function getEstimateOptions() {}

export const createEstimateOptions = proAction
  .schema(CreateEstimateOptionSchema)
  .action(async ({ parsedInput }) => {});

export const updateEstimateOptions = proAction
  .schema(CreateEstimateOptionSchema)
  .action(async ({ parsedInput }) => {});

export const deleteEstimateOptions = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
