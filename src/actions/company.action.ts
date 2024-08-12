"use server";

import { z } from "zod";
import { company, CreateCompanySchema } from "../db";
import { ActionError, proAction, userAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getCompanies = userAction.action(async () => {});

export const getCompanyById = userAction
  .schema(z.string())
  .action(async () => {});

export const createCompany = proAction
  .schema(CreateCompanySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(company)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Company not created");
    }

    return data;
  });

export const updateCompany = proAction
  .schema(CreateCompanySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(company)
      .set(parsedInput)
      .where(eq(company.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Company not updated");
    }

    return data;
  });

export const deleteCompany = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(company)
      .where(eq(company.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("Company not deleted");
    }
  });
