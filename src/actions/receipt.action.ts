"use server";

import { z } from "zod";
import { companyAction, db } from "../lib";
import { CreateReceiptSchema, receipt } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getReceipts = companyAction.handler(async () => {});

export const createReceipt = companyAction
  .input(CreateReceiptSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(receipt).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Receipt not created");
    }

    return data;
  });

export const updateReceipt = companyAction
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

export const deleteReceipt = companyAction
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
