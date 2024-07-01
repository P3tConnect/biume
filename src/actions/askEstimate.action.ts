"use server";

import { z } from "zod";
import { ActionError, userAction } from "../utils/action";
import { CreateAskEstimateSchema, askEstimate } from "../db";
// import { db } from "../utils/db";

export async function getAskEstimates() {
  // const res = await db.query.askEstimate.findMany();
  // return res;
}

export const createAskEstimate = userAction
  .schema(CreateAskEstimateSchema)
  .action(async ({ parsedInput }) => {});

export const updateAskEstimate = userAction
  .schema(CreateAskEstimateSchema)
  .action(async ({ parsedInput }) => {});

export const deleteAskEstimate = userAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
