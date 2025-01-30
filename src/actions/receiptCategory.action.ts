"use server";
import { z } from "zod";
import { CreateReceiptCategorySchema } from "../db";
import { ownerAction } from "../lib";

export const getReceiptCategories = ownerAction.action(async () => {});

export const createReceiptCategories = ownerAction
  .schema(CreateReceiptCategorySchema)
  .action(async ({ parsedInput }) => {});

export const updateReceiptCategory = ownerAction
  .schema(CreateReceiptCategorySchema)
  .action(async ({ parsedInput }) => {});

export const deleteReceiptCategory = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
