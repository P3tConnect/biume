"use server";

import { z } from "zod";
import { authedAction, ownerAction, db, ActionError } from "../lib";
import { CreateInvoiceSchema, invoice } from "../db";
import { eq } from "drizzle-orm";

export const getInvoices = authedAction.action(async () => {});

export const createInvoice = ownerAction
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

export const updateInvoice = ownerAction
  .schema(CreateInvoiceSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(invoice)
      .set(parsedInput)
      .where(eq(invoice.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Invoice not updated");
    }

    return data;
  });

export const deleteInvoice = ownerAction
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
