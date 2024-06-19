"use server";

import { z } from "zod";
import { CreateProgressionSchema } from "../db";
import { proAction } from "../utils/action";

export async function getProgression() {}

export const createProgression = proAction(
    CreateProgressionSchema,
    async (params, _) => {},
);

export const updateProgression = proAction(
    CreateProgressionSchema,
    async (params, _) => {},
);

export const deleteProgression = proAction(z.string(), async (params, _) => {});
