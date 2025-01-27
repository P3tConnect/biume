"use server";

import { z } from "zod";
import { CreateIntolerenceSchema, intolerences } from "../db";
import { authedAction, db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getIntolerences = authedAction.handler(async () => {});

export const createIntolerence = authedAction
  .input(CreateIntolerenceSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(intolerences)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Intolerence not created");
    }

    return data;
  });

export const updateIntolerence = authedAction
  .input(CreateIntolerenceSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(intolerences)
      .set(input)
      .where(eq(intolerences.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Intolerence not updated");
    }

    return data;
  });

export const deleteIntolerence = authedAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(intolerences)
      .where(eq(intolerences.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Intolerence not deleted");
    }
  });
