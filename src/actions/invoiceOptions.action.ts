"use server";

import { z } from "zod";
import { CreateInvoiceOptionsSchema } from "../db";
import { ownerAction, authedAction } from "../lib";

export const getInvoiceOptions = authedAction.action(async () => {});

export const createInvoiceOptions = ownerAction
  .schema(CreateInvoiceOptionsSchema)
  .action(async ({ parsedInput }) => {});

export const updateInvoiceOptions = ownerAction
  .schema(CreateInvoiceOptionsSchema)
  .action(async ({ parsedInput }) => {});

export const deleteInvoiceOptions = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
