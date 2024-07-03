"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateReceiptProductSchema } from "../db";

export async function getReceiptProduct() {}

export const createReceiptProduct = proAction
  .schema(CreateReceiptProductSchema)
  .action(async () => {});

export const updateReceiptProduct = proAction
  .schema(CreateReceiptProductSchema)
  .action(async () => {});

export const deleteReceiptProduct = proAction
  .schema(z.string())
  .action(async () => {});
