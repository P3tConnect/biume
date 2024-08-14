"use server";

import { z } from "zod";
import { companyAction } from "../lib/action";
import { CreateReceiptProductSchema } from "../db";

export const getReceiptProduct = companyAction.handler(async () => {});

export const createReceiptProduct = companyAction
  .input(CreateReceiptProductSchema)
  .handler(async () => {});

export const updateReceiptProduct = companyAction
  .input(CreateReceiptProductSchema)
  .handler(async () => {});

export const deleteReceiptProduct = companyAction
  .input(z.string())
  .handler(async () => {});
