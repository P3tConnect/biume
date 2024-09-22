"use server";
import { z } from "zod";
import { CreateReceiptCategorySchema } from "../db";
import { ownerAction } from "../lib";

export const getReceiptCategories = ownerAction.handler(async () => {});

export const createReceiptCategories = ownerAction
  .input(CreateReceiptCategorySchema)
  .handler(async () => {});

export const updateReceiptCategory = ownerAction
  .input(CreateReceiptCategorySchema)
  .handler(async () => {});

export const deleteReceiptCategory = ownerAction
  .input(z.string())
  .handler(async () => {});
