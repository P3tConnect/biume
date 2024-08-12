"use server";

import { z } from "zod";
import { CreateProSessionSchema, proSession } from "../db";
import { ActionError, proAction, userAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getProSessions = userAction.action(async () => {});

export const getProSessionById = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});

export const getProSessionByCompany = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});

export const createProSession = proAction
  .schema(CreateProSessionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(proSession)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("ProSession not created");
    }

    return data;
  });

export const updateProSession = proAction
  .schema(CreateProSessionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(proSession)
      .set(parsedInput)
      .where(eq(proSession.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("ProSession not updated");
    }

    return data;
  });

export const deleteProSession = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(proSession)
      .where(eq(proSession.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("ProSession not deleted");
    }
  });
