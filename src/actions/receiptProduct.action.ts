"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateReceiptProductSchema } from "../db";

export async function getReceiptProduct() {}

export const createReceiptProduct = proAction(
    CreateReceiptProductSchema,
    async (params, _) => {},
);

export const updateReceiptProduct = proAction(
    CreateReceiptProductSchema,
    async (params, _) => {},
);

export const deleteReceiptProduct = proAction(
    z.string(),
    async (params, _) => {},
);
