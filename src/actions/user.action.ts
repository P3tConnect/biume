"use server";

import { z } from "zod";
import {
  action,
  clientAction,
  db,
  registerSchema,
  signIn,
  signOut,
} from "../lib";
import { CreateUserSchema, user } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";
import * as bcrypt from "bcryptjs";

export const loginWithCredentials = action
  .input(z.object({ email: z.string(), password: z.string() }))
  .handler(async ({ input }) => {
    const { email, password } = input;

    const dbUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (!dbUser) {
      throw new ZSAError("ERROR", "User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, dbUser.password!);

    if (!isPasswordCorrect) {
      throw new ZSAError("ERROR", "Password not correct");
    }

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/dashboard",
    });
  });

export const logout = async () => {
  await signOut();
};

export const loginWithGoogle = async () => {
  await signIn("google", {
    redirect: true,
    redirectTo: "/dashboard",
  });
};

export const loginWithFacebook = async () => {
  await signIn("facebook", {
    redirect: true,
    redirectTo: "/dashboard",
  });
};

export const getUsers = clientAction.handler(async () => {});

export const registerNewUser = action
  .input(registerSchema)
  .handler(async ({ input, ctx }) => {
    try {
      const retreiveUser = await db.query.user.findFirst({
        where: eq(user.email, input.email),
      });

      if (retreiveUser) {
        throw new ZSAError("ERROR", "User already exists");
      }

      const hashPassword = await bcrypt.hash(input.password, 10);

      const data = await db
        .insert(user)
        .values({
          ...input,
          password: hashPassword,
        })
        .returning()
        .execute();

      if (!data) {
        throw new ZSAError("ERROR", "User not created");
      }

      await signIn("credentials", {
        email: input.email,
        password: input.password,
        redirect: true,
        redirectTo: "/dashboard",
      });
    } catch (err) {
      throw new ZSAError("ERROR", err);
    }
  });

export const createUser = clientAction
  .input(CreateUserSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(user).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "User not created");
    }

    return data;
  });

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

export const deleteUser = clientAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(user)
      .where(eq(user.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "User not deleted");
    }
  });
