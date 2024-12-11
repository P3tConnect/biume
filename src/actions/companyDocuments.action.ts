"use server";

import { z } from "zod";
import { ownerAction, db } from "../lib";
import { organizationDocuments, CreateOrganizationDocumentsSchema } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getCompanyDocuments = ownerAction.handler(async () => {});

export const createCompanyDocuments = ownerAction
  .input(CreateOrganizationDocumentsSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(organizationDocuments)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDocuments not created");
    }

    return data;
  });

export const updateCompanyDocuments = ownerAction
  .input(CreateOrganizationDocumentsSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(organizationDocuments)
      .set(input)
      .where(eq(organizationDocuments.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDocuments not updated");
    }

    return data;
  });

export const deleteCompanyDocuments = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(organizationDocuments)
      .where(eq(organizationDocuments.id, input))
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDocuments not deleted");
    }
  });
