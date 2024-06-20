"use server";

import { z } from "zod";
import { proAction } from "../utils/action";
import { CreateTaskSchema } from "../db";

export async function getTasks() {}

export const createTask = proAction(CreateTaskSchema, async (params, _) => {});

export const updateTask = proAction(CreateTaskSchema, async (params, _) => {});

export const deleteTask = proAction(z.string(), async (params, _) => {});
