"use server";

import { z } from "zod";
import { ActionError, proAction, userAction } from "../lib/action";
import { CreateRatingSchema, ratings } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getRatings = userAction.action(async () => {});

export const createRating = userAction
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

export const updateRating = userAction
  .schema(CreateRatingSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(ratings)
      .set(parsedInput)
      .where(eq(ratings.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Rating not updated");
    }

    return data;
  });

export const deleteRating = proAction
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
