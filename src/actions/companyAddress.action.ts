"use server";
import { z } from "zod";
import { organizationAddress, CreateCompanyAddressSchema } from "../db";
import { db, ownerAction } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getCompanyAddress = ownerAction.handler(async () => {});

export const createCompanyAddress = ownerAction
  .input(CreateCompanyAddressSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(organizationAddress)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyAddress not created");
    }

    return data;
  });

export const updateCompanyAddress = ownerAction
  .input(CreateCompanyAddressSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(organizationAddress)
      .set(input)
      .where(eq(organizationAddress.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyAddress not updated");
    }

    return data;
  });

export const deleteCompanyAddress = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(organizationAddress)
      .where(eq(organizationAddress.id, input))
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyAddress not deleted");
    }
  });
