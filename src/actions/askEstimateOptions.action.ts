"use server";

import { z } from "zod";
import { ownerAction, db } from "../lib";
import { CreateAskEstimateOptionSchema, askEstimateOptions } from "../db";
import { ZSAError } from "zsa";

export async function getAskEstimateOptions() {}

export const createAskEstimateOptions = ownerAction
  .input(CreateAskEstimateOptionSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(askEstimateOptions)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "AskEstimateOptions not created");
    }

    return data;
  });

export const updateAskEstimateOptions = ownerAction
  .input(CreateAskEstimateOptionSchema)
  .handler(async ({ input }) => {});

export const deleteAskEstimateOptions = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {});
