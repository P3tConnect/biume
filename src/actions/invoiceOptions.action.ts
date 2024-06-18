"use server";

import { z } from "zod";
import { CreateInvoiceOptionsSchema } from "../db";
import { proAction } from "../utils/action";

export async function getInvoiceOptions() {}

export const createInvoiceOptions = proAction(
    CreateInvoiceOptionsSchema,
    async (params, _) => {},
);

export const updateInvoiceOptions = proAction(
    CreateInvoiceOptionsSchema,
    async (params, _) => {},
);

export const deleteInvoiceOptions = proAction(
    z.string(),
    async (params, _) => {},
);
