"use server";

import { z } from "zod";
import {
  action,
  clientAction,
  db,
  loginSchema,
  registerSchema,
  signIn,
  signOut,
} from "../lib";
import { CreateUserSchema, user } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const loginWithCredentials = action
  .input(loginSchema)
  .handler(async ({ input }) => {
    const { email, password } = input;

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/dashboard",
    });
  });

export const logout = async () => {
  await signOut({
    redirect: true,
    redirectTo: "/",
  });
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
  .handler(async ({ input }) => {
    const response = await signIn("credentials", {
      firstname: input.firstname,
      name: input.name,
      email: input.email,
      password: input.password,
      redirect: true,
      redirectTo: "/onboarding",
    });

    console.log(response, "response nextauth");
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
