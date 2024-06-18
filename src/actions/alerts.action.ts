"use server";

import { CreateAlertsSchema } from "../db";
import { proAction } from "../utils/action";
import { z } from "zod";

export async function getAlerts() {}

export const createAlert = proAction(
    CreateAlertsSchema,
    async (params, _) => {},
);

export const updateAlert = proAction(
    CreateAlertsSchema,
    async (params, _) => {},
);

export const deleteAlert = proAction(z.string(), async (params, _) => {});
