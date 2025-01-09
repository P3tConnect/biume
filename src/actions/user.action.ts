"use server";

import { clientAction, db } from "../lib";
import { CreateUserSchema, user } from "../db";
import { ZSAError } from "zsa";
import { eq } from "drizzle-orm";

export const updateUser = clientAction
  .input(CreateUserSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(user)
      .set(input)
      .where(eq(user.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "User not updated");
    }

    return data;
  });
