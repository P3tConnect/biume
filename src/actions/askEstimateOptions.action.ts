"use server";

import { z } from "zod";
import { ActionError, proAction } from "../utils/action";
import { CreateAskEstimateOptionSchema, askEstimateOptions } from "../db";
// import { db } from "../utils/db";

export async function getAskEstimateOptions() {}

export const createAskEstimateOptions = proAction(
  CreateAskEstimateOptionSchema,
  async (params, _) => {
    // const res = await db.insert(askEstimateOptions).values(params);
    // if (!res) {
    //     throw new ActionError("Failed to create ask estimate options");
    // }
  },
);

export const updateAskEstimateOptions = proAction(
  CreateAskEstimateOptionSchema,
  async (params, _) => {
    // const res = await db.update(askEstimateOptions).set(params);
    // if (!res) {
    //     throw new ActionError("Failed to update ask estimate options");
    // }
  },
);

export const deleteAskEstimateOptions = proAction(
  z.string(),
  async (params, _) => {},
);
