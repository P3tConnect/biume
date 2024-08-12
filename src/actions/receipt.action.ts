"use server";

import { z } from "zod";
import { ActionError, proAction } from "../lib/action";
import { CreateReceiptSchema, receipt } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getReceipts = proAction.action(async () => {});

export const createReceipt = proAction
  .schema(CreateReceiptSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(receipt)
      .values(parsedInput)
      .returning()
      .execute();
    if (!data) {
      throw new ActionError("Receipt not created");
    }
    return data;
  });

export const updateReceipt = proAction
  .schema(CreateReceiptSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(receipt)
      .set(parsedInput)
      .where(eq(receipt.id, parsedInput.id))
      .returning()
      .execute();
    if (!data) {
      throw new ActionError("Receipt not updated");
    }
    return data;
  });

export const deleteReceipt = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(receipt)
      .where(eq(receipt.id, parsedInput))
      .returning()
      .execute();
    if (!data) {
      throw new ActionError("Receipt not deleted");
    }
  });
