"use server";

import { z } from "zod";
import {
  companyDisponibilities,
  CreateCompanyDisponibilitiesSchema,
} from "../db";
import { ActionError, proAction, userAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getCompanyDisponibilities = userAction.action(async () => {});

export const createCompanyDisponibilities = proAction
  .schema(CreateCompanyDisponibilitiesSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(companyDisponibilities)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CompanyDisponibilities not created");
    }

    return data;
  });

export const updateCompanyDisponibilities = proAction
  .schema(CreateCompanyDisponibilitiesSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(companyDisponibilities)
      .set(parsedInput)
      .where(eq(companyDisponibilities.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CompanyDisponibilities not updated");
    }

    return data;
  });

export const deleteCompanyDisponibilities = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(companyDisponibilities)
      .where(eq(companyDisponibilities.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("CompanyDisponibilities not deleted");
    }
  });
