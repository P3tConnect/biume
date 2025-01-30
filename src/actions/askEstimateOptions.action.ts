"use server";

import { z } from "zod";
import { ownerAction, db, ActionError } from "../lib";
import { CreateAskEstimateOptionSchema, askEstimateOptions } from "../db";

export async function getAskEstimateOptions() {}

export const createAskEstimateOptions = ownerAction
  .schema(CreateAskEstimateOptionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(askEstimateOptions)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("AskEstimateOptions not created");
    }

    return data;
  });

export const updateAskEstimateOptions = ownerAction
  .schema(CreateAskEstimateOptionSchema)
  .action(async ({ parsedInput }) => {});

export const deleteAskEstimateOptions = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
