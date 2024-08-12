"use server";

import { z } from "zod";
import { ActionError, proAction, userAction } from "../lib/action";
import { CreateInvoiceSchema, invoice } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getInvoices = userAction.action(async () => {});

export const createInvoice = proAction
  .schema(CreateInvoiceSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(invoice)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Invoice not created");
    }

    return data;
  });

export const updateInvoice = proAction
  .schema(CreateInvoiceSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(invoice)
      .set(parsedInput)
      .where(eq(invoice.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Invoice not updated");
    }

    return data;
  });

export const deleteInvoice = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(invoice)
      .where(eq(invoice.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Invoice not deleted");
    }
  });
