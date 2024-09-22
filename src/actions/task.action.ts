"use server";

import { z } from "zod";
import { ownerAction } from "../lib/action";
import { CreateTaskSchema, task } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getTasks = ownerAction.handler(async () => {});

export const createTask = ownerAction
  .input(CreateTaskSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(task).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Task not created");
    }

    return data;
  });

export const updateTask = ownerAction
  .input(CreateTaskSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(task)
      .set(input)
      .where(eq(task.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Task not updated");
    }

    return data;
  });

export const deleteTask = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(task)
      .where(eq(task.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Task not deleted");
    }
  });
