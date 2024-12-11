"use server";

import { z } from "zod";
import { ActionError, userAction } from "../lib/action";
import { CreateAskEstimateSchema, askEstimate } from "../db";

export async function getAskEstimates() {}

export const createAskEstimate = userAction
  .schema(CreateAskEstimateSchema)
  .action(async ({ parsedInput }) => {});

export const updateAskEstimate = userAction
  .schema(CreateAskEstimateSchema)
  .action(async ({ parsedInput }) => {});

export const deleteAskEstimate = userAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
