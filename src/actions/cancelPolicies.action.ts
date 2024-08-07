"use server";

import { z } from "zod";
import { proAction, userAction } from "../lib/action";
import { CreateCancelPolicySchema } from "../db";

export const getCancelPolicies = userAction.action(async () => {});

export const getCancelPoliciesByCompany = userAction.action(async () => {});

export const createCancelPolicies = proAction
  .schema(CreateCancelPolicySchema)
  .action(async ({ parsedInput }) => {});

export const updateCancelPolicies = proAction
  .schema(CreateCancelPolicySchema)
  .action(async ({ parsedInput }) => {});

export const deleteCancelPolicies = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
