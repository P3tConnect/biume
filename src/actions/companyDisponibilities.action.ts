"use server";

import { z } from "zod";
import {
  organizationDisponibilities,
  CreateOrganizationDisponibilitiesSchema,
} from "../db";
import { authedAction, ownerAction, db, ActionError } from "../lib";
import { eq } from "drizzle-orm";

export const getOrganizationDisponibilities = authedAction.action(
  async () => {},
);

export const createOrganizationDisponibilities = ownerAction
  .schema(CreateOrganizationDisponibilitiesSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(organizationDisponibilities)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CompanyDisponibilities not created");
    }

    return data;
  });

export const updateOrganizationDisponibilities = ownerAction
  .schema(CreateOrganizationDisponibilitiesSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(organizationDisponibilities)
      .set(parsedInput)
      .where(eq(organizationDisponibilities.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CompanyDisponibilities not updated");
    }

    return data;
  });

export const deleteOrganizationDisponibilities = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(organizationDisponibilities)
      .where(eq(organizationDisponibilities.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("CompanyDisponibilities not deleted");
    }
  });
