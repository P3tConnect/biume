"use server";

import { z } from "zod";
import { CreateEstimateSchema } from "../db";
import { proAction } from "../utils/action";

export async function getEstimates() {}

export const createEstimate = proAction(
    CreateEstimateSchema,
    async (params, _) => {},
);

export const updateEstimate = proAction(
    CreateEstimateSchema,
    async (params, _) => {},
);

export const deleteEstimate = proAction(z.string(), async (params, _) => {});
