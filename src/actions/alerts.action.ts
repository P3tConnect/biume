"use server";

import { CreateAlertsSchema } from "../db";
import { proAction } from "../utils/action";
import { z } from "zod";

export async function getAlerts() {}

export const createAlert = proAction
  .schema(CreateAlertsSchema)
  .action(async ({ parsedInput }) => {});

export const updateAlert = proAction
  .schema(CreateAlertsSchema)
  .action(async ({ parsedInput }) => {});

export const deleteAlert = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
