"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateServiceSchema } from "../db";

export async function getServices() {}

export const createService = proAction(
    CreateServiceSchema,
    async (params, _) => {},
);

export const updateService = proAction(
    CreateServiceSchema,
    async (params, _) => {},
);

export const deleteService = proAction(z.string(), async (params, _) => {});
