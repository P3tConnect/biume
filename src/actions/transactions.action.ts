"use server";

import { z } from "zod";
import { CreateTransactionSchema, transaction } from "../db";
import { ActionError, db, userAction } from "../lib";
import { eq } from "drizzle-orm";

export const getTransactions = userAction.action(async () => {});

export const createTransactions = userAction
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

export const updateTransactions = userAction
  .schema(CreateTransactionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(transaction)
      .set(parsedInput)
      .where(eq(transaction.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Transaction not updated");
    }

    return data;
  });

export const deleteTransaction = userAction
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
