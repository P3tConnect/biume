"use server";

import { z } from "zod";
import { CreateProgressionSchema, progression } from "../db";
import { organization } from "../db/organization";
import { ActionError, createServerAction, db, requireAuth } from "../lib";
import { eq } from "drizzle-orm";

export const getProgression = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const org = ctx.organization;

    const [progressionResult] = await db
      .select()
      .from(progression)
      .innerJoin(organization, eq(organization.progressionId, progression.id))
      .where(eq(organization.id, org?.id ?? ""))
      .execute();

    return progressionResult;
  },
  [requireAuth],
);

export const createProgression = createServerAction(
  CreateProgressionSchema,
  async (input, ctx) => {
    const data = await db
      .insert(progression)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Progression not created");
    }

    return data;
  },
  [requireAuth],
);

export const updateProgression = createServerAction(
  CreateProgressionSchema,
  async (input, ctx) => {
    const data = await db
      .update(progression)
      .set(input)
      .where(eq(progression.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Progression not updated");
    }

    return data;
  },
  [requireAuth],
);

export const deleteProgression = createServerAction(
  z.string(),
  async (input, ctx) => {
    const data = await db
      .delete(progression)
      .where(eq(progression.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Progression not deleted");
    }
  },
  [requireAuth],
);
