"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateAlertsTypeSchema } from "../db/alertTypes";

export async function getAlertsTypes() {}

export const createAlertsTypes = proAction(
    CreateAlertsTypeSchema,
    async (params, _) => {},
);

export const updateAlertsTypes = proAction(
    CreateAlertsTypeSchema,
    async (params, _) => {},
);

export const deleteAlertsTypes = proAction(z.string(), async (params, _) => {});
