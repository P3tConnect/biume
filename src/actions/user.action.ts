"use server";

import { z } from "zod";
import { ActionError, userAction } from "../lib/action";
import { CreateUserSchema, user } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getUsers = userAction.action(async () => {});

export const createUser = userAction
  .schema(CreateUserSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(user)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("User not created");
    }

    return data;
  });

export const updateUser = userAction
  .schema(CreateUserSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(user)
      .set(parsedInput)
      .where(eq(user.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("User not updated");
    }

    return data;
  });

export const deleteUser = userAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(user)
      .where(eq(user.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("User not deleted");
    }
  });
