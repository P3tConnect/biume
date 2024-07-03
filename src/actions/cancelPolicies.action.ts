"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateCancelPolicySchema } from "../db";

export async function getCancelPolicies() {}

export async function getCancelPoliciesByCompany() {}

export const createCancelPolicies = proAction
  .schema(CreateCancelPolicySchema)
  .action(async ({ parsedInput }) => {});

export const updateCancelPolicies = proAction
  .schema(CreateCancelPolicySchema)
  .action(async ({ parsedInput }) => {});

export const deleteCancelPolicies = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
