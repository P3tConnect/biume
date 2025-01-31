"use server";

import { z } from "zod";
import { CreateTransactionSchema, transaction } from "../db";
import {
  db,
  ActionError,
  createServerAction,
  requireAuth,
  requireOwner,
} from "../lib";
import { eq } from "drizzle-orm";

export const getTransactions = createServerAction(
  z.string(),
  async (input, ctx) => {
    return [];
  },
  [requireAuth, requireOwner],
);

export const createTransactions = createServerAction(
  CreateTransactionSchema,
  async (input, ctx) => {
    const data = await db
      .insert(transaction)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Transaction not created");
    }

    return data;
  },
  [requireAuth, requireOwner],
);

export const updateTransactions = createServerAction(
  CreateTransactionSchema,
  async (input, ctx) => {
    const data = await db
      .update(transaction)
      .set(input)
      .where(eq(transaction.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Transaction not updated");
    }

    return data;
  },
  [requireAuth, requireOwner],
);

export const deleteTransaction = createServerAction(
  z.string(),
  async (input, ctx) => {
    const data = await db
      .delete(transaction)
      .where(eq(transaction.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Transaction not deleted");
    }

    return data;
  },
  [requireAuth, requireOwner],
);
