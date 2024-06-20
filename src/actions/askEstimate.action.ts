"use server";

import { z } from "zod";
import { ActionError, userAction } from "../utils/action";
import { CreateAskEstimateSchema, askEstimate } from "../db";
// import { db } from "../utils/db";

export async function getAskEstimates() {
  // const res = await db.query.askEstimate.findMany();
  // return res;
}

export const createAskEstimate = userAction(
  CreateAskEstimateSchema,
  async (params, _) => {
    // const res = await db.insert(askEstimate).values(params);
    // if (!res) {
    //     throw new ActionError("Can't create Ask Estimate");
    // }
  },
);

export const updateAskEstimate = userAction(
  CreateAskEstimateSchema,
  async (params, _) => {
    // const res = await db;
  },
);

export const deleteAskEstimate = userAction(
  z.string(),
  async (params, _) => {},
);
