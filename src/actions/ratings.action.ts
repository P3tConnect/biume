"use server";

import { z } from "zod";
import { proAction, userAction } from "../lib/action";
import { CreateRatingSchema } from "../db";

export const getRatings = userAction.action(async () => {});

export const createRating = userAction
  .schema(CreateRatingSchema)
  .action(async () => {});

export const updateRating = userAction
  .schema(CreateRatingSchema)
  .action(async () => {});

export const deleteRating = proAction.schema(z.string()).action(async () => {});
