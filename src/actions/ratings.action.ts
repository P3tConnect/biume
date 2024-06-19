"use server";

import { z } from "zod";
import { proAction, userAction } from "../utils/action";
import { CreateRatingSchema } from "../db";

export async function getRatings() {}

export const createRating = userAction(
    CreateRatingSchema,
    async (params, _) => {},
);

export const updateRating = userAction(
    CreateRatingSchema,
    async (params, _) => {},
);

export const deleteRating = proAction(z.string(), async (params, _) => {});
