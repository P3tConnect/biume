"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateCompanyDocumentsSchema } from "../db";

export async function getCompanyDocuments(companyId: string) {}

export const createCompanyDocuments = proAction
  .schema(CreateCompanyDocumentsSchema)
  .action(async ({ parsedInput }) => {});

export const updateCompanyDocuments = proAction
  .schema(CreateCompanyDocumentsSchema)
  .action(async ({ parsedInput }) => {});

export const deleteCompanyDocuments = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
