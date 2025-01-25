"use server";

import { z } from "zod";
import { CreateInvoiceOptionsSchema } from "../db";
import { ownerAction, authedAction } from "../lib";

export const getInvoiceOptions = authedAction.handler(async () => {});

export const createInvoiceOptions = ownerAction
  .input(CreateInvoiceOptionsSchema)
  .handler(async ({}) => {});

export const updateInvoiceOptions = ownerAction
  .input(CreateInvoiceOptionsSchema)
  .handler(async ({}) => {});

export const deleteInvoiceOptions = ownerAction
  .input(z.string())
  .handler(async ({}) => {});
