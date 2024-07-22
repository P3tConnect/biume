"use server";
import { z } from "zod";
import { CreateReceiptCategorySchema } from "../db";
import { proAction } from "../lib";

export const getReceiptCategories = () => {};

export const createReceiptCategories = proAction
  .schema(CreateReceiptCategorySchema)
  .action(async () => {});

export const updateReceiptCategory = proAction
  .schema(CreateReceiptCategorySchema)
  .action(async () => {});

export const deleteReceiptCategory = proAction
  .schema(z.string())
  .action(async () => {});
