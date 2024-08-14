"use server";
import { z } from "zod";
import { CreateReceiptCategorySchema } from "../db";
import { companyAction } from "../lib";

export const getReceiptCategories = companyAction.handler(async () => {});

export const createReceiptCategories = companyAction
  .input(CreateReceiptCategorySchema)
  .handler(async () => {});

export const updateReceiptCategory = companyAction
  .input(CreateReceiptCategorySchema)
  .handler(async () => {});

export const deleteReceiptCategory = companyAction
  .input(z.string())
  .handler(async () => {});
