"use server";

import { z } from "zod";
import { authedAction } from "../lib/action";
import { askEstimate, CreateAskEstimateSchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getAskEstimates = authedAction.handler(async () => {
  const data = await db.query.askEstimate.findMany().execute();

  if (!data) {
    throw new ZSAError("NOT_FOUND", "AskEstimates not found");
  }

  return data;
});

export const createAskEstimate = authedAction
  .input(CreateAskEstimateSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(askEstimate)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "AskEstimate not created");
    }

    return data;
  });

export const updateAskEstimate = authedAction
  .input(CreateAskEstimateSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(askEstimate)
      .set(input)
      .where(eq(askEstimate.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "AskEstimate not updated");
    }

    return data;
  });

export const deleteAskEstimate = authedAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(askEstimate)
      .where(eq(askEstimate.id, input))
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "AskEstimate not deleted");
    }
  });
