"use server";
import { z } from "zod";
import { CreateDeseaseSchema, deseases } from "../db";
import { ActionError, db, userAction } from "../lib";
import { eq } from "drizzle-orm";

export const getDeseases = userAction.action(async () => {});

export const creteDesease = userAction
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

export const updateDesease = userAction
  .schema(CreateDeseaseSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(deseases)
      .set(parsedInput)
      .where(eq(deseases.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Desease not updated");
    }

    return data;
  });

export const deleteDesease = userAction
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
