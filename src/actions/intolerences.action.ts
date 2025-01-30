"use server";

import { z } from "zod";
import { CreateIntolerenceSchema, intolerences } from "../db";
import { authedAction, db, ActionError } from "../lib";
import { eq } from "drizzle-orm";

export const getIntolerences = authedAction.action(async () => {});

export const createIntolerence = authedAction
  .schema(CreateIntolerenceSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(intolerences)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Intolerence not created");
    }

    return data;
  });

export const updateIntolerence = authedAction
  .schema(CreateIntolerenceSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(intolerences)
      .set(parsedInput)
      .where(eq(intolerences.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Intolerence not updated");
    }

    return data;
  });

export const deleteIntolerence = authedAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(intolerences)
      .where(eq(intolerences.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Intolerence not deleted");
    }
  });
