"use server";

import { z } from "zod";
import { CreateProSessionSchema, proSession } from "../db";
import { clientAction, ownerAction, db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getProSessions = clientAction.handler(async () => {});

export const getProSessionById = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {});

export const getProSessionByCompany = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {});

export const createProSession = ownerAction
  .input(CreateProSessionSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(proSession)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "ProSession not created");
    }

    return data;
  });

export const updateProSession = ownerAction
  .input(CreateProSessionSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(proSession)
      .set(input)
      .where(eq(proSession.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "ProSession not updated");
    }

    return data;
  });

export const deleteProSession = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(proSession)
      .where(eq(proSession.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "ProSession not deleted");
    }
  });
