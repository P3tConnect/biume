"use server";

import { z } from "zod";
import { CreateProSessionSchema } from "../db";
import { proAction } from "../utils/action";

export async function getProSessions() {}

export const createProSession = proAction(
    CreateProSessionSchema,
    async (params, _) => {},
);

export const updateProSession = proAction(
    CreateProSessionSchema,
    async (params, _) => {},
);

export const deleteProSession = proAction(z.string(), async (params, _) => {});
