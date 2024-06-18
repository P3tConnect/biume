"use server";

import { z } from "zod";
import { userAction } from "../utils/action";
import { CreateAskEstimateSchema } from "../db";

export async function getAskEstimates() {}

export const createAskEstimate = userAction(
    CreateAskEstimateSchema,
    async (params, _) => {},
);

export const updateAskEstimate = userAction(
    CreateAskEstimateSchema,
    async (params, _) => {},
);

export const deleteAskEstimate = userAction(
    z.string(),
    async (params, _) => {},
);
