"use server";

import { z } from "zod";
import {
  db,
  ActionError,
  createServerAction,
  requireOwner,
  requireAuth,
} from "../lib";
import { CreateOptionSchema, options as optionsTable } from "../db";
import { eq } from "drizzle-orm";
import { auth } from "../lib/auth";
import { proOptionsSchema } from "@/components/onboarding/types/onboarding-schemas";
import { headers } from "next/headers";

export const getOptions = createServerAction(
  z.object({}),
  async (input, ctx) => {
    return [];
  },
  [requireAuth, requireOwner],
);

export const createOption = createServerAction(
  CreateOptionSchema,
  async (input, ctx) => {
    const data = await db
      .insert(optionsTable)
      .values(input)
      .returning()
      .execute();
    if (!data) {
      throw new ActionError("Option not created");
    }
    return data;
  },
  [requireAuth, requireOwner],
);

export const createOptionsStepAction = createServerAction(
  proOptionsSchema,
  async (input, ctx) => {
    const organization = await auth.api.getFullOrganization({
      headers: await headers(),
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
  },
  [requireAuth, requireOwner],
);

export const updateOption = createServerAction(
  CreateOptionSchema,
  async (input, ctx) => {
    const data = await db
      .update(optionsTable)
      .set(input)
      .where(eq(optionsTable.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Option not updated");
    }

    return data;
  },
  [requireAuth, requireOwner],
);

export const deleteOption = createServerAction(
  z.string(),
  async (input, ctx) => {
    const data = await db
      .delete(optionsTable)
      .where(eq(optionsTable.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Option not deleted");
    }
  },
  [requireAuth, requireOwner],
);
