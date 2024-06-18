"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateOptionSchema } from "../db";

export async function getOptions() {}

export const createOption = proAction(
    CreateOptionSchema,
    async (params, _) => {},
);

export const updateOption = proAction(
    CreateOptionSchema,
    async (params, _) => {},
);

export const deleteOption = proAction(z.string(), async (params, _) => {});
