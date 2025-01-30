"use server";

import { z } from "zod";
import { CreateProgressionSchema, progression } from "../db";
import { organization } from "../db/organization";
import { ownerAction, db, ActionError } from "../lib";
import { eq } from "drizzle-orm";

export const getProgression = ownerAction.action(async ({ ctx }) => {
  const org = ctx.organization;

  const data = await db
    .select()
    .from(progression)
    .innerJoin(organization, eq(organization.progressionId, progression.id))
    .where(eq(organization.id, org.id))
    .execute();

  if (!data || data.length === 0) {
    throw new ActionError("Progression not found");
  }

  return data[0].progression;
});

export const createProgression = ownerAction
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

export const updateProgression = ownerAction
  .schema(CreateProgressionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(progression)
      .set(parsedInput)
      .where(eq(progression.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Progression not updated");
    }

    return data;
  });

export const deleteProgression = ownerAction
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
