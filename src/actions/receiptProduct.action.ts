"use server";

import { z } from "zod";
import { ownerAction } from "../lib/action";
import { CreateReceiptProductSchema } from "../db";

export const getReceiptProduct = ownerAction.handler(async () => {});

export const createReceiptProduct = ownerAction
  .input(CreateReceiptProductSchema)
  .handler(async () => {});

export const updateReceiptProduct = ownerAction
  .input(CreateReceiptProductSchema)
  .handler(async () => {});

export const deleteReceiptProduct = ownerAction
  .input(z.string())
  .handler(async () => {});
