"use server";

import { z } from "zod";
import { CreateObservationSchema, observation } from "../db";
import { ActionError, proAction, userAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getObservations = userAction.action(async () => {});

export const createObservation = proAction
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

export const updateObservation = proAction
  .schema(CreateObservationSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(observation)
      .set(parsedInput)
      .where(eq(observation.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Observation not updated");
    }

    return data;
  });

export const deleteObservation = proAction
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
