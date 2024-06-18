"use server";

import { z } from "zod";
import { CreateEstimateOptionSchema } from "../db";
import { proAction } from "../utils/action";

export async function getEstimateOptions() {}

export const createEstimateOptions = proAction(
    CreateEstimateOptionSchema,
    async (params, _) => {},
);

export const updateEstimateOptions = proAction(
    CreateEstimateOptionSchema,
    async (params, _) => {},
);

export const deleteEstimateOptions = proAction(
    z.string(),
    async (params, _) => {},
);
