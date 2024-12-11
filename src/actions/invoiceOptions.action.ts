"use server";

import { z } from "zod";
import { CreateInvoiceOptionsSchema } from "../db";
import { ownerAction, clientAction } from "../lib";

export const getInvoiceOptions = clientAction.handler(async () => {});

export const createInvoiceOptions = ownerAction
  .input(CreateInvoiceOptionsSchema)
  .handler(async ({}) => {});

export const updateInvoiceOptions = ownerAction
  .input(CreateInvoiceOptionsSchema)
  .handler(async ({}) => {});

export const deleteInvoiceOptions = ownerAction
  .input(z.string())
  .handler(async ({}) => {});
