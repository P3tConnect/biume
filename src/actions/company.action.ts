"use server";

import { z } from "zod";
import { company, CreateCompanySchema } from "../db";
import { companyAction, clientAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getCompanies = clientAction.handler(async () => {});

export const getCompanyById = clientAction
  .input(z.string())
  .handler(async ({ input }) => {});

export const createCompany = companyAction
  .input(CreateCompanySchema)
  .handler(async ({ input }) => {
    const data = await db.insert(company).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Company not created");
    }

    return data;
  });

export const updateCompany = companyAction
  .input(CreateCompanySchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(company)
      .set(input)
      .where(eq(company.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Company not updated");
    }

    return data;
  });

export const deleteCompany = companyAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(company)
      .where(eq(company.id, input))
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Company not deleted");
    }
  });
