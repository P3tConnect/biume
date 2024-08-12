"use server";

import { z } from "zod";
import { ActionError, proAction } from "../lib/action";
import { companyDocuments, CreateCompanyDocumentsSchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getCompanyDocuments = proAction.action(async () => {});

export const createCompanyDocuments = proAction
  .schema(CreateCompanyDocumentsSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(companyDocuments)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CompanyDocuments not created");
    }

    return data;
  });

export const updateCompanyDocuments = proAction
  .schema(CreateCompanyDocumentsSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(companyDocuments)
      .set(parsedInput)
      .where(eq(companyDocuments.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CompanyDocuments not updated");
    }

    return data;
  });

export const deleteCompanyDocuments = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(companyDocuments)
      .where(eq(companyDocuments.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("CompanyDocuments not deleted");
    }
  });
