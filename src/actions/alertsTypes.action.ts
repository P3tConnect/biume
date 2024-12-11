"use server";

import { z } from "zod";
import { proAction } from "../lib/action";
import { CreateAlertsTypeSchema } from "../db/alertTypes";

export async function getAlertsTypes() {}

export const createAlertsTypes = proAction
  .schema(CreateAlertsTypeSchema)
  .action(async ({ parsedInput }) => {});

export const updateAlertsTypes = proAction
  .schema(CreateAlertsTypeSchema)
  .action(async ({ parsedInput }) => {});

export const deleteAlertsTypes = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {});
