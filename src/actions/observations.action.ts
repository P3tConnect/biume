"use server";

import { z } from "zod";
import { CreateObservationSchema, observation } from "../db";
import { companyAction, clientAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getObservations = clientAction.handler(async () => {});

export const createObservation = companyAction
  .input(CreateObservationSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(observation)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Observation not created");
    }

    return data;
  });

export const updateObservation = companyAction
  .input(CreateObservationSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(observation)
      .set(input)
      .where(eq(observation.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Observation not updated");
    }

    return data;
  });

export const deleteObservation = companyAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(observation)
      .where(eq(observation.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Observation not deleted");
    }
  });
