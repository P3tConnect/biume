"use server";

import { z } from "zod";
import { CreateProgressionSchema, progression } from "../db";
import { ActionError, proAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getProgression = proAction.action(async () => {});

export const createProgression = proAction
  .schema(CreateProgressionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(progression)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Progression not created");
    }

    return data;
  });

export const updateProgression = proAction
  .schema(CreateProgressionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(progression)
      .set(parsedInput)
      .where(eq(progression.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Progression not updated");
    }

    return data;
  });

export const deleteProgression = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(progression)
      .where(eq(progression.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Progression not deleted");
    }
  });
