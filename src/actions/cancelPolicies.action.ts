"use server";

import { z } from "zod";
import { ActionError, proAction, userAction } from "../lib/action";
import { cancelPolicies, CreateCancelPolicySchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getCancelPolicies = userAction.action(async () => {
  const data = await db.query.cancelPolicies.findMany().execute();

  if (!data) {
    throw new ActionError("CancelPolicies not found");
  }

  return data;
});

export const getCancelPoliciesByCompany = userAction.action(
  async ({ parsedInput }) => {},
);

export const createCancelPolicies = proAction
  .schema(CreateCancelPolicySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(cancelPolicies)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CancelPolicies not created");
    }

    return data;
  });

export const updateCancelPolicies = proAction
  .schema(CreateCancelPolicySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(cancelPolicies)
      .set(parsedInput)
      .where(eq(cancelPolicies.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CancelPolicies not updated");
    }

    return data;
  });

export const deleteCancelPolicies = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
