"use server";

import { z } from "zod";
import { ownerAction, db, ActionError } from "../lib";
import { CreateReceiptSchema, receipt } from "../db";
import { eq } from "drizzle-orm";

export const getReceipts = ownerAction.action(async () => {});

export const createReceipt = ownerAction
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

export const updateReceipt = ownerAction
  .schema(CreateReceiptSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(receipt)
      .set(parsedInput)
      .where(eq(receipt.id, parsedInput.id as string))
      .returning()
      .execute();
    if (!data) {
      throw new ActionError("Receipt not updated");
    }
    return data;
  });

export const deleteReceipt = ownerAction
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
