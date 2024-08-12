"use server";
import { z } from "zod";
import {
  companyAddress,
  CreateCompanyAddressSchema,
} from "../db/companyAddress";
import { ActionError, db, proAction } from "../lib";
import { eq } from "drizzle-orm";

export const getCompanyAddress = proAction.action(async () => {});

export const createCompanyAddress = proAction
  .schema(CreateCompanyAddressSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(companyAddress)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CompanyAddress not created");
    }

    return data;
  });

export const updateCompanyAddress = proAction
  .schema(CreateCompanyAddressSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(companyAddress)
      .set(parsedInput)
      .where(eq(companyAddress.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CompanyAddress not updated");
    }

    return data;
  });

export const deleteCompanyAddress = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(companyAddress)
      .where(eq(companyAddress.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("CompanyAddress not deleted");
    }
  });
