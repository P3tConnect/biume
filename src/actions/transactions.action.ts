"use server";

import { z } from "zod";
import { CreateTransactionSchema, transaction } from "../db";
import { db, authedAction } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getTransactions = authedAction.handler(async () => {});

export const createTransactions = authedAction
  .input(CreateTransactionSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(transaction)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Transaction not created");
    }

    return data;
  });

export const updateTransactions = authedAction
  .input(CreateTransactionSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(transaction)
      .set(input)
      .where(eq(transaction.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Transaction not updated");
    }

    return data;
  });

export const deleteTransaction = authedAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(transaction)
      .where(eq(transaction.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Transaction not deleted");
    }
  });
