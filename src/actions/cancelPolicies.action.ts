"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateCancelPolicySchema } from "../db";

export async function getCancelPolicies() {}

export async function getCancelPoliciesByCompany() {}

export const createCancelPolicies = proAction(
    CreateCancelPolicySchema,
    async (params, _) => {},
);

export const updateCancelPolicies = proAction(
    CreateCancelPolicySchema,
    async (params, _) => {},
);

export const deleteCancelPolicies = proAction(
    z.string(),
    async (params, _) => {},
);
