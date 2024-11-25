"use server";

import { z } from "zod";
import {
  organizationDisponibilities,
  CreateOrganizationDisponibilitiesSchema,
} from "../db";
import { clientAction, ownerAction, db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getOrganizationDisponibilities = clientAction.handler(async () => {});

export const createOrganizationDisponibilities = ownerAction
  .input(CreateOrganizationDisponibilitiesSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(organizationDisponibilities)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDisponibilities not created");
    }

    return data;
  });

export const updateOrganizationDisponibilities = ownerAction
  .input(CreateOrganizationDisponibilitiesSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(organizationDisponibilities)
      .set(input)
      .where(eq(organizationDisponibilities.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDisponibilities not updated");
    }

    return data;
  });

export const deleteOrganizationDisponibilities = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(organizationDisponibilities)
      .where(eq(organizationDisponibilities.id, input))
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyDisponibilities not deleted");
    }
  });
