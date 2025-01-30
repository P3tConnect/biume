"use server";

import { z } from "zod";
import { ownerAction, db, authedAction, ActionError } from "../lib";
import { CreateOptionSchema, options as optionsTable } from "../db";
import { eq } from "drizzle-orm";
import { auth } from "../lib/auth";
import { proOptionsSchema } from "@/components/onboarding/types/onboarding-schemas";
import { headers } from "next/headers";

export const getOptions = authedAction.action(async () => {});

export const createOption = ownerAction
  .schema(CreateOptionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(optionsTable)
      .values(parsedInput)
      .returning()
      .execute();
    if (!data) {
      throw new ActionError("Option not created");
    }
    return data;
  });

export const createOptionsStepAction = authedAction
  .schema(proOptionsSchema)
  .action(async ({ parsedInput }) => {
    const organization = await auth.api.getFullOrganization({
      headers: await headers(),
    });
    if (!organization) return;
    const options = parsedInput.options;
    await db
      .insert(optionsTable)
      .values(
        options.map((option) => ({
          ...option,
          organizationId: organization.id,
        })),
      )
      .execute();
  });

export const updateOption = ownerAction
  .schema(CreateOptionSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(optionsTable)
      .set(parsedInput)
      .where(eq(optionsTable.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Option not updated");
    }

    return data;
  });

export const deleteOption = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(optionsTable)
      .where(eq(optionsTable.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Option not deleted");
    }
  });
