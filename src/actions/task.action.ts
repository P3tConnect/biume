"use server";

import { z } from "zod";
import { proAction } from "../lib/action";
import { CreateTaskSchema } from "../db";

export async function getTasks() {}

export const createTask = proAction
  .schema(CreateTaskSchema)
  .action(async () => {});

export const updateTask = proAction
  .schema(CreateTaskSchema)
  .action(async () => {});

export const deleteTask = proAction.schema(z.string()).action(async () => {});
