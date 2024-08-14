"use server";

import { z } from "zod";
import { CreateInvoiceOptionsSchema } from "../db";
import { companyAction, clientAction } from "../lib";

export const getInvoiceOptions = clientAction.handler(async () => {});

export const createInvoiceOptions = companyAction
  .input(CreateInvoiceOptionsSchema)
  .handler(async ({}) => {});

export const updateInvoiceOptions = companyAction
  .input(CreateInvoiceOptionsSchema)
  .handler(async ({}) => {});

export const deleteInvoiceOptions = companyAction
  .input(z.string())
  .handler(async ({}) => {});
