"use server";

import { z } from "zod";
import { ownerAction, db } from "../lib";
import { CreateReceiptSchema, receipt } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getReceipts = ownerAction.handler(async () => {});

export const createReceipt = ownerAction
  .input(CreateReceiptSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(receipt).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Receipt not created");
    }

    return data;
  });

export const updateReceipt = ownerAction
  .input(CreateReceiptSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(receipt)
      .set(input)
      .where(eq(receipt.id, input.id as string))
      .returning()
      .execute();
    if (!data) {
      throw new ZSAError("ERROR", "Receipt not updated");
    }
    return data;
  });

export const deleteReceipt = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(receipt)
      .where(eq(receipt.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Receipt not deleted");
    }
  });
