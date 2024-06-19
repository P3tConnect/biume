"use server";

import { z } from "zod";
import { CreateIntolerenceSchema } from "../db";
import { userAction } from "../utils/action";

export async function getIntolerences() {}

export const createIntolerence = userAction(
    CreateIntolerenceSchema,
    async (params, _) => {},
);

export const updateIntolerence = userAction(
    CreateIntolerenceSchema,
    async (params, _) => {},
);

export const deleteIntolerence = userAction(
    z.string(),
    async (params, _) => {},
);
