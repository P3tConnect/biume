"use server";

import { z } from "zod";
import { proAction, userAction } from "../lib/action";
import { CreateInvoiceSchema } from "../db";

export const getInvoices = userAction.action(async () => {});

export const createInvoice = proAction
  .schema(CreateInvoiceSchema)
  .action(async ({ parsedInput }) => {});

export const updateInvoice = proAction
  .schema(CreateInvoiceSchema)
  .action(async ({ parsedInput }) => {});

export const deleteInvoice = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
