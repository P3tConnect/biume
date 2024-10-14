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
import { getCurrentLocale } from "@/src/locales";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

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
  .handler(async ({ input }) => {
    try {
      await signIn("credentials", {
        firstname: input.firstname,
        name: input.name,
        email: input.email,
        password: input.password,
        redirect: false,
      });

      return { ok: true, message: "Connexion réussie" };
    } catch (err) {
      if (err instanceof AuthError) {
        switch (err.type) {
          case "CredentialsSignin":
            return { ok: false, message: "Email ou mot de passe incorrect" };
          default:
            return { ok: false, message: "Erreur lors de la connexion" };
        }
      }
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
