"use server";

import { z } from "zod";
import { proAction } from "../lib/action";
import { CreateReceiptProductSchema } from "../db";

export const getReceiptProduct = proAction.action(async () => {});

export const createReceiptProduct = proAction
  .schema(CreateReceiptProductSchema)
  .action(async () => {});

export const updateReceiptProduct = proAction
  .schema(CreateReceiptProductSchema)
  .action(async () => {});

export const deleteReceiptProduct = proAction
  .schema(z.string())
  .action(async () => {});
