"use server";

import { z } from "zod";
import { authedAction, ownerAction, db, ActionError } from "../lib";
import { CreateRatingSchema, ratings } from "../db";
import { eq } from "drizzle-orm";

export const getRatings = authedAction.action(async () => {});

export const createRating = authedAction
  .schema(CreateRatingSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(ratings)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Rating not created");
    }

    return data;
  });

export const updateRating = authedAction
  .schema(CreateRatingSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(ratings)
      .set(parsedInput)
      .where(eq(ratings.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Rating not updated");
    }

    return data;
  });

export const deleteRating = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(ratings)
      .where(eq(ratings.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Rating not deleted");
    }
  });
