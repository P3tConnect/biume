"use server";

import { z } from "zod";
import { ActionError, userAction } from "../lib/action";
import { askEstimate, CreateAskEstimateSchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getAskEstimates = userAction.action(async () => {
  const data = await db.query.askEstimate.findMany().execute();

  if (!data) {
    throw new ActionError("AskEstimates not found");
  }

  return data;
});

export const createAskEstimate = userAction
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

export const updateAskEstimate = userAction
  .schema(CreateAskEstimateSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(askEstimate)
      .set(parsedInput)
      .where(eq(askEstimate.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("AskEstimate not updated");
    }

    return data;
  });

export const deleteAskEstimate = userAction
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
