"use server";

import { z } from "zod";
import { CreateTransactionSchema, transaction } from "../db";
import { db, authedAction, ActionError } from "../lib";
import { eq } from "drizzle-orm";

export const getTransactions = authedAction.action(async () => {});

export const createTransactions = authedAction
  .schema(CreateTransactionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(transaction)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Transaction not created");
    }

    return data;
  });

export const updateTransactions = authedAction
  .schema(CreateTransactionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(transaction)
      .set(parsedInput)
      .where(eq(transaction.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Transaction not updated");
    }

    return data;
  });

export const deleteTransaction = authedAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(transaction)
      .where(eq(transaction.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Transaction not deleted");
    }
  });
