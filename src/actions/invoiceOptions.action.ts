"use server";

import { z } from "zod";
import { CreateInvoiceOptionsSchema } from "../db";
import { proAction, userAction } from "../lib/action";

export const getInvoiceOptions = userAction.action(async () => {});

export const createInvoiceOptions = proAction
  .schema(CreateInvoiceOptionsSchema)
  .action(async ({}) => {});

export const updateInvoiceOptions = proAction
  .schema(CreateInvoiceOptionsSchema)
  .action(async ({}) => {});

export const deleteInvoiceOptions = proAction
  .schema(z.string())
  .action(async ({}) => {});
