"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateInvoiceSchema } from "../db";

export async function getInvoices() {}

export const createInvoice = proAction
  .schema(CreateInvoiceSchema)
  .action(async ({ parsedInput }) => {});

export const updateInvoice = proAction
  .schema(CreateInvoiceSchema)
  .action(async ({ parsedInput }) => {});

export const deleteInvoice = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
