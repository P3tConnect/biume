"use server";

import { z } from "zod";
import { ActionError, proAction } from "../lib/action";
import { CreateAskEstimateOptionSchema, askEstimateOptions } from "../db";
// import { db } from "..//db";

export async function getAskEstimateOptions() {}

export const createAskEstimateOptions = proAction
  .schema(CreateAskEstimateOptionSchema)
  .action(async ({}) => {});

export const updateAskEstimateOptions = proAction
  .schema(CreateAskEstimateOptionSchema)
  .action(async ({}) => {});

export const deleteAskEstimateOptions = proAction
  .schema(z.string())
  .action(async ({}) => {});
