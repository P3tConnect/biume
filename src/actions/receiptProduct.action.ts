"use server";

import { z } from "zod";
import { ownerAction } from "../lib";
import { CreateReceiptProductSchema } from "../db";

export const getReceiptProduct = ownerAction.action(async () => {});

export const createReceiptProduct = ownerAction
  .schema(CreateReceiptProductSchema)
  .action(async ({ parsedInput }) => {});

export const updateReceiptProduct = ownerAction
  .schema(CreateReceiptProductSchema)
  .action(async ({ parsedInput }) => {});

export const deleteReceiptProduct = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
