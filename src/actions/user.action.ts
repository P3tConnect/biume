"use server";

import { CreateUserSchema, user } from "../db";
import { clientAction, db } from "../lib";
import { ZSAError } from "zsa";

export const createUser = clientAction
  .input(CreateUserSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(user).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "User not created");
    }

    return data;
});