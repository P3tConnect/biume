"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateOptionSchema } from "../db";

export async function getOptions() {}

export const createOption = proAction
  .schema(CreateOptionSchema)
  .action(async () => {});

export const updateOption = proAction
  .schema(CreateOptionSchema)
  .action(async () => {});

export const deleteOption = proAction.schema(z.string()).action(async () => {});
