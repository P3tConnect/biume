"use server";

import { z } from "zod";
import { CreateIntolerenceSchema, intolerences } from "../db";
import { ActionError, userAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getIntolerences = userAction.action(async () => {});

export const createIntolerence = userAction
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

export const updateIntolerence = userAction
  .schema(CreateIntolerenceSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(intolerences)
      .set(parsedInput)
      .where(eq(intolerences.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Intolerence not updated");
    }

    return data;
  });

export const deleteIntolerence = userAction
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
