"use server";

import { z } from "zod";
import { ActionError, proAction, userAction } from "../lib/action";
import { CreateOptionSchema, options } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getOptions = userAction.action(async () => {});

export const createOption = proAction
  .schema(CreateOptionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(options)
      .values(parsedInput)
      .returning()
      .execute();
    if (!data) {
      throw new ActionError("Option not created");
    }
    return data;
  });

export const updateOption = proAction
  .schema(CreateOptionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(options)
      .set(parsedInput)
      .where(eq(options.id, parsedInput.id))
      .returning()
      .execute();
    if (!data) {
      throw new ActionError("Option not updated");
    }
    return data;
  });

export const deleteOption = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(options)
      .where(eq(options.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Option not deleted");
    }
  });
