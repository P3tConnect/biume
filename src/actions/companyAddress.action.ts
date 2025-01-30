"use server";
import { z } from "zod";
import { organizationAddress, CreateCompanyAddressSchema } from "../db";
import { db, ownerAction, ActionError } from "../lib";
import { eq } from "drizzle-orm";

export const getCompanyAddress = ownerAction.action(async () => {});

export const createCompanyAddress = ownerAction
  .schema(CreateCompanyAddressSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(organizationAddress)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CompanyAddress not created");
    }

    return data;
  });

export const updateCompanyAddress = ownerAction
  .schema(CreateCompanyAddressSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(organizationAddress)
      .set(parsedInput)
      .where(eq(organizationAddress.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CompanyAddress not updated");
    }

    return data;
  });

export const deleteCompanyAddress = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(organizationAddress)
      .where(eq(organizationAddress.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("CompanyAddress not deleted");
    }
  });
