"use server";
import { z } from "zod";
import { CreateDeseaseSchema, deseases } from "../db";
import { db, authedAction, ActionError } from "../lib";
import { eq } from "drizzle-orm";

export const getDeseases = authedAction.action(async () => {});

export const creteDesease = authedAction
  .schema(CreateDeseaseSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(deseases)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Desease not created");
    }

    return data;
  });

export const updateDesease = authedAction
  .schema(CreateDeseaseSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(deseases)
      .set(parsedInput)
      .where(eq(deseases.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Desease not updated");
    }

    return data;
  });

export const deleteDesease = authedAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(deseases)
      .where(eq(deseases.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Desease not deleted");
    }

    return data;
  });
