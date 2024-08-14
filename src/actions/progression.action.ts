"use server";

import { z } from "zod";
import { CreateProgressionSchema, progression } from "../db";
import { companyAction, db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getProgression = companyAction.handler(async () => {});

export const createProgression = companyAction
  .input(CreateProgressionSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(progression)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Progression not created");
    }

    return data;
  });

export const updateProgression = companyAction
  .input(CreateProgressionSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(progression)
      .set(input)
      .where(eq(progression.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Progression not updated");
    }

    return data;
  });

export const deleteProgression = companyAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(progression)
      .where(eq(progression.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Progression not deleted");
    }
  });
