"use server";

import { z } from "zod";
import { clientAction, ownerAction, db } from "../lib";
import { CreateRatingSchema, ratings } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getRatings = clientAction.handler(async () => {});

export const createRating = clientAction
  .input(CreateRatingSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(ratings).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Rating not created");
    }

    return data;
  });

export const updateRating = clientAction
  .input(CreateRatingSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(ratings)
      .set(input)
      .where(eq(ratings.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Rating not updated");
    }

    return data;
  });

export const deleteRating = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(ratings)
      .where(eq(ratings.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Rating not deleted");
    }
  });
