"use server";

import { z } from "zod";
import { clientAction, ownerAction, db } from "../lib";
import { CreateInvoiceSchema, invoice } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getInvoices = clientAction.handler(async () => {});

export const createInvoice = ownerAction
  .input(CreateInvoiceSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(invoice).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Invoice not created");
    }

    return data;
  });

export const updateInvoice = ownerAction
  .input(CreateInvoiceSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(invoice)
      .set(input)
      .where(eq(invoice.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Invoice not updated");
    }

    return data;
  });

export const deleteInvoice = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(invoice)
      .where(eq(invoice.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Invoice not deleted");
    }
  });
