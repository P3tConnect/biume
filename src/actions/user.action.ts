"use server";

import {
  db,
  ActionError,
  createServerAction,
  requireOwner,
  requireAuth,
} from "../lib";
import { CreateUserSchema, user } from "../db";
import { eq } from "drizzle-orm";

export const updateUser = createServerAction(
  CreateUserSchema,
  async (input, ctx) => {
    const data = await db
      .update(user)
      .set(input)
      .where(eq(user.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("User not updated");
    }

    return data;
  },
  [requireAuth],
);
