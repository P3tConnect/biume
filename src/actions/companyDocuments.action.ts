"use server";

import { z } from "zod";
import { companyAction, db } from "../lib";
import { companyDocuments, CreateCompanyDocumentsSchema } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getCompanyDocuments = companyAction.handler(async () => {});

export const createCompanyDocuments = companyAction
  .input(CreateCompanyDocumentsSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(companyDocuments)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDocuments not created");
    }

    return data;
  });

export const updateCompanyDocuments = companyAction
  .input(CreateCompanyDocumentsSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(companyDocuments)
      .set(input)
      .where(eq(companyDocuments.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDocuments not updated");
    }

    return data;
  });

export const deleteCompanyDocuments = companyAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(companyDocuments)
      .where(eq(companyDocuments.id, input))
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDocuments not deleted");
    }
  });
