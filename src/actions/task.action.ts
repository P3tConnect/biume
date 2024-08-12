"use server";

import { z } from "zod";
import { ActionError, proAction } from "../lib/action";
import { CreateTaskSchema, task } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getTasks = proAction.action(async () => {});

export const createTask = proAction
  .schema(CreateTaskSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(task)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Task not created");
    }

    return data;
  });

export const updateTask = proAction
  .schema(CreateTaskSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(task)
      .set(parsedInput)
      .where(eq(task.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Task not updated");
    }

    return data;
  });

export const deleteTask = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(task)
      .where(eq(task.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Task not deleted");
    }
  });
