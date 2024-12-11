"use server";

import { z } from "zod";
import { CreateProgressionSchema } from "../db";
import { proAction } from "../lib/action";

export async function getProgression() {}

export const createProgression = proAction
  .schema(CreateProgressionSchema)
  .action(async () => {});

export const updateProgression = proAction
  .schema(CreateProgressionSchema)
  .action(async () => {});

export const deleteProgression = proAction
  .schema(z.string())
  .action(async () => {});
