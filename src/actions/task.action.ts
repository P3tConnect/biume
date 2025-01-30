"use server";

import { z } from "zod";
import { ownerAction } from "../lib";
import { CreateTaskSchema, task } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getTasks = ownerAction.action(async () => {});

export const createTask = ownerAction
  .schema(CreateTaskSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(task)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Task not created");
    }

    return data;
  });

export const updateTask = ownerAction
  .schema(CreateTaskSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(task)
      .set(parsedInput)
      .where(eq(task.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Task not updated");
    }

    return data;
  });

export const deleteTask = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(task)
      .where(eq(task.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Task not deleted");
    }
  });
