"use server";

import { z } from "zod";
import { proAction, userAction } from "../lib/action";
import { CreateOptionSchema } from "../db";

export const getOptions = userAction.action(async () => {});

export const createOption = proAction
  .schema(CreateOptionSchema)
  .action(async () => {});

export const updateOption = proAction
  .schema(CreateOptionSchema)
  .action(async () => {});

export const deleteOption = proAction.schema(z.string()).action(async () => {});
