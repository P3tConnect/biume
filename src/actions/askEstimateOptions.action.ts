"use server";

import { z } from "zod";
import { ActionError, proAction } from "../utils/action";
import { CreateAskEstimateOptionSchema, askEstimateOptions } from "../db";
// import { db } from "../utils/db";

export async function getAskEstimateOptions() {}

export const createAskEstimateOptions = proAction
  .schema(CreateAskEstimateOptionSchema)
  .action(async ({ parsedInput }) => {});

export const updateAskEstimateOptions = proAction
  .schema(CreateAskEstimateOptionSchema)
  .action(async ({ parsedInput }) => {});

export const deleteAskEstimateOptions = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
