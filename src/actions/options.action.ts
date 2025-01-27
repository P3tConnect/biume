"use server";

import { z } from "zod";
import { ownerAction, db, authedAction } from "../lib";
import { CreateOptionSchema, options as optionsTable } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";
import { auth } from "../lib/auth";
import { proOptionsSchema } from "@/components/onboarding/types/onboarding-schemas";

export const getOptions = authedAction.handler(async () => {});

export const createOption = ownerAction
  .input(CreateOptionSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(optionsTable)
      .values(input)
      .returning()
      .execute();
    if (!data) {
      throw new ZSAError("ERROR", "Option not created");
    }
    return data;
  });

export const createOptionsStepAction = authedAction
  .input(proOptionsSchema)
  .handler(async ({ input, request }) => {
    const organization = await auth.api.getFullOrganization({
      headers: request?.headers!,
    });
    if (!organization) return;
    const options = input.options;
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
  .input(CreateOptionSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(optionsTable)
      .set(input)
      .where(eq(optionsTable.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Option not updated");
    }

    return data;
  });

export const deleteOption = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(optionsTable)
      .where(eq(optionsTable.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Option not deleted");
    }
  });
