"use server";

import { z } from "zod";
import { ActionError, proAction } from "../utils/action";
import { db } from "../utils/db";
import { eq } from "drizzle-orm";
import { CreateCompanyDocumentsSchema, companyDocuments } from "../db";

export async function getCompanyDocuments() {}

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
