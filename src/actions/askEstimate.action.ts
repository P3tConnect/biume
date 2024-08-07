"use server";

import { z } from "zod";
import { userAction } from "../lib/action";
import { CreateAskEstimateSchema } from "../db";

export const getAskEstimates = userAction.action(async () => {});

export const createAskEstimate = userAction
  .schema(CreateAskEstimateSchema)
  .action(async ({}) => {});

export const updateAskEstimate = userAction
  .schema(CreateAskEstimateSchema)
  .action(async ({}) => {});

export const deleteAskEstimate = userAction
  .schema(z.string())
  .action(async ({}) => {});
