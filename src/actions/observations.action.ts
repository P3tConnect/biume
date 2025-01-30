"use server";

import { z } from "zod";
import { CreateObservationSchema, observation } from "../db";
import { ownerAction, authedAction, ActionError } from "../lib";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getObservations = authedAction.action(async () => {});

export const createObservation = ownerAction
  .schema(CreateObservationSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(observation)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Observation not created");
    }

    return data;
  });

export const updateObservation = ownerAction
  .schema(CreateObservationSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(observation)
      .set(parsedInput)
      .where(eq(observation.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Observation not updated");
    }

    return data;
  });

export const deleteObservation = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(observation)
      .where(eq(observation.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Observation not deleted");
    }
  });
