"use server";

import { z } from "zod";
import { proAction, userAction } from "../utils/action";
import { CreateRatingSchema } from "../db";

export async function getRatings() {}

export const createRating = userAction
  .schema(CreateRatingSchema)
  .action(async () => {});

export const updateRating = userAction
  .schema(CreateRatingSchema)
  .action(async () => {});

export const deleteRating = proAction.schema(z.string()).action(async () => {});
