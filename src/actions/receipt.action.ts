"use server";

import { z } from "zod";
import { proAction } from "../lib/action";
import { CreateReceiptSchema } from "../db";

export async function getReceipts() {}

export const createReceipt = proAction
  .schema(CreateReceiptSchema)
  .action(async () => {});

export const updateReceipt = proAction
  .schema(CreateReceiptSchema)
  .action(async () => {});

export const deleteReceipt = proAction
  .schema(z.string())
  .action(async () => {});
