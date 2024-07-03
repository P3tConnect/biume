"use server";

import { z } from "zod";
import { CreateEstimateSchema } from "../db";
import { proAction } from "../utils/action";

export async function getEstimates() {}

export async function getEstimatesByCustomer() {}

export async function getEstimatesByCompany() {}

export const createEstimate = proAction
  .schema(CreateEstimateSchema)
  .action(async ({ parsedInput }) => {});

export const updateEstimate = proAction
  .schema(CreateEstimateSchema)
  .action(async ({ parsedInput }) => {});

export const deleteEstimate = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
