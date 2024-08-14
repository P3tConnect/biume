"use server";

import { z } from "zod";
import { companyAction, db } from "../lib";
import { CreateAskEstimateOptionSchema, askEstimateOptions } from "../db";
import { ZSAError } from "zsa";

export async function getAskEstimateOptions() {}

export const createAskEstimateOptions = companyAction
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

export const updateAskEstimateOptions = companyAction
  .input(CreateAskEstimateOptionSchema)
  .handler(async ({ input }) => {});

export const deleteAskEstimateOptions = companyAction
  .input(z.string())
  .handler(async ({ input }) => {});
