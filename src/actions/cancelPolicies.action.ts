"use server";

import { z } from "zod";
import { companyAction, clientAction } from "../lib/action";
import { cancelPolicies, CreateCancelPolicySchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getCancelPolicies = clientAction.handler(async () => {
  const data = await db.query.cancelPolicies.findMany().execute();

  if (!data) {
    throw new ZSAError("NOT_FOUND", "CancelPolicies not found");
  }

  return data;
});

export const getCancelPoliciesByCompany = clientAction.handler(
  async ({ input }) => {},
);

export const createCancelPolicies = companyAction
  .input(CreateCancelPolicySchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(cancelPolicies)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CancelPolicies not created");
    }

    return data;
  });

export const updateCancelPolicies = companyAction
  .input(CreateCancelPolicySchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(cancelPolicies)
      .set(input)
      .where(eq(cancelPolicies.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CancelPolicies not updated");
    }

    return data;
  });

export const deleteCancelPolicies = companyAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(cancelPolicies)
      .where(eq(cancelPolicies.id, input))
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CancelPolicies not deleted");
    }
  });
