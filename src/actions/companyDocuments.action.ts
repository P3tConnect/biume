"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateCompanyDocumentsSchema } from "../db";

export async function getCompanyDocuments(companyId: string) {}

export const createCompanyDocuments = proAction(
    CreateCompanyDocumentsSchema,
    async (params, _) => {},
);

export const updateCompanyDocuments = proAction(
    CreateCompanyDocumentsSchema,
    async (params, _) => {},
);

export const deleteCompanyDocuments = proAction(
    z.string(),
    async (params, _) => {},
);
