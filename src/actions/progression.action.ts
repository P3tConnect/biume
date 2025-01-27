"use server";

import { z } from "zod";
import { CreateProgressionSchema, progression } from "../db";
import { organization } from "../db/organization";
import { ownerAction, db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getProgression = ownerAction.handler(async ({ ctx }) => {
  const org = ctx.org;

  const data = await db
    .select()
    .from(progression)
    .innerJoin(organization, eq(organization.progressionId, progression.id))
    .where(eq(organization.id, org.id))
    .execute();

  if (!data || data.length === 0) {
    throw new ZSAError("ERROR", "Progression not found");
  }

  return data[0].progression;
});

export const createProgression = ownerAction
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

export const updateProgression = ownerAction
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

export const deleteProgression = ownerAction
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
