"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateReceiptSchema } from "../db";

export async function getReceipts() {}

export const createReceipt = proAction(
    CreateReceiptSchema,
    async (params, _) => {},
);

export const updateReceipt = proAction(
    CreateReceiptSchema,
    async (params, _) => {},
);

export const deleteReceipt = proAction(z.string(), async (params, _) => {});
