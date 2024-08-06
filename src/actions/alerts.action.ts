"use server";

import { CreateAlertsSchema } from "../db";
import { proAction } from "../lib/action";
import { z } from "zod";

export const getAlerts = proAction.action(async () => {});

export const createAlert = proAction
  .schema(CreateAlertsSchema)
  .action(async ({ parsedInput }) => {});

export const updateAlert = proAction
  .schema(CreateAlertsSchema)
  .action(async ({ parsedInput }) => {});

export const deleteAlert = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
