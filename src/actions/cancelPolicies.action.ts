"use server";

import { z } from "zod";
import { ownerAction, authedAction, ActionError } from "../lib";
import { cancelPolicies, CreateCancelPolicySchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getCancelPolicies = authedAction.action(async () => {
  const data = await db.query.cancelPolicies.findMany().execute();

  if (!data) {
    throw new ActionError("CancelPolicies not found");
  }

  return data;
});

export const getCancelPoliciesByCompany = authedAction.action(async () => {});

export const createCancelPolicies = ownerAction
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

export const updateCancelPolicies = ownerAction
  .schema(CreateCancelPolicySchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(cancelPolicies)
      .set(parsedInput)
      .where(eq(cancelPolicies.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("CancelPolicies not updated");
    }

    return data;
  });

export const deleteCancelPolicies = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(cancelPolicies)
      .where(eq(cancelPolicies.id, parsedInput))
      .execute();

    if (!data) {
      throw new ActionError("CancelPolicies not deleted");
    }
  });
