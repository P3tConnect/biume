"use server";

import { z } from "zod";
import { proAction } from "../lib/action";
import { CreateCompanyDocumentsSchema } from "../db";

export const getCompanyDocuments = proAction.action(async () => {});

export const createCompanyDocuments = proAction
  .schema(CreateCompanyDocumentsSchema)
  .action(async ({ parsedInput }) => {});

export const updateCompanyDocuments = proAction
  .schema(CreateCompanyDocumentsSchema)
  .action(async ({ parsedInput }) => {});

export const deleteCompanyDocuments = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
