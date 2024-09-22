"use server";

import { z } from "zod";
import {
  companyDisponibilities,
  CreateCompanyDisponibilitiesSchema,
} from "../db";
import { clientAction, ownerAction, db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getCompanyDisponibilities = clientAction.handler(async () => {});

export const createCompanyDisponibilities = ownerAction
  .input(CreateCompanyDisponibilitiesSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(companyDisponibilities)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDisponibilities not created");
    }

    return data;
  });

export const updateCompanyDisponibilities = ownerAction
  .input(CreateCompanyDisponibilitiesSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(companyDisponibilities)
      .set(input)
      .where(eq(companyDisponibilities.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDisponibilities not updated");
    }

    return data;
  });

export const deleteCompanyDisponibilities = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(companyDisponibilities)
      .where(eq(companyDisponibilities.id, input))
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDisponibilities not deleted");
    }
  });
