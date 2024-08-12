"use server";

import { z } from "zod";
import { ActionError, proAction } from "../lib/action";
import { CreateAskEstimateOptionSchema, askEstimateOptions } from "../db";
import { db } from "../lib";
// import { db } from "..//db";

export async function getAskEstimateOptions() {}

export const createAskEstimateOptions = proAction
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

export const updateAskEstimateOptions = proAction
  .schema(CreateAskEstimateOptionSchema)
  .action(async ({ parsedInput }) => {});

export const deleteAskEstimateOptions = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
