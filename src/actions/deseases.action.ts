"use server";
import { z } from "zod";
import { CreateDeseaseSchema, deseases } from "../db";
import { db, clientAction } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getDeseases = clientAction.handler(async () => {});

export const creteDesease = clientAction
  .input(CreateDeseaseSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(deseases).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Desease not created");
    }

    return data;
  });

export const updateDesease = clientAction
  .input(CreateDeseaseSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(deseases)
      .set(input)
      .where(eq(deseases.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Desease not updated");
    }

    return data;
  });

export const deleteDesease = clientAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(deseases)
      .where(eq(deseases.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Desease not deleted");
    }

    return data;
  });
