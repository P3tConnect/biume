"use server";

import { authedAction, db, ActionError } from "../lib";
import { CreateUserSchema, user } from "../db";
import { eq } from "drizzle-orm";

export const updateUser = authedAction
  .schema(CreateUserSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(user)
      .set(parsedInput)
      .where(eq(user.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("User not updated");
    }

    return data;
  });
