"use server";

import { z } from "zod";
import { authedAction } from "../lib";
import { askEstimate, CreateAskEstimateSchema } from "../db";
import { db, ActionError } from "../lib";
import { eq } from "drizzle-orm";

export const getAskEstimates = authedAction.action(async () => {
  const data = await db.query.askEstimate.findMany().execute();

  if (!data) {
    throw new ActionError("AskEstimates not found");
  }

  return data;
});

export const createAskEstimate = authedAction
  .schema(CreateAskEstimateSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(askEstimate)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("AskEstimate not created");
    }

    return data;
  });

export const updateAskEstimate = authedAction
  .schema(CreateAskEstimateSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(askEstimate)
      .set(parsedInput)
      .where(eq(askEstimate.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("AskEstimate not updated");
    }

    return data;
  });

export const deleteAskEstimate = authedAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(askEstimate)
      .where(eq(askEstimate.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("AskEstimate not deleted");
    }
  });
