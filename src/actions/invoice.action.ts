"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateInvoiceSchema } from "../db";

export async function getInvoices() {}

export const createInvoice = proAction(
    CreateInvoiceSchema,
    async (params, _) => {},
);

export const updateInvoice = proAction(
    CreateInvoiceSchema,
    async (params, _) => {},
);

export const deleteInvoice = proAction(z.string(), async (params, _) => {});
