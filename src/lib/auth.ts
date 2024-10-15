import { Adapter, AdapterUser } from "next-auth/adapters";

import Credentials from "next-auth/providers/credentials";
import { AuthError } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { accounts } from "../db/accounts";
import { authenticators } from "../db/authenticator";
import { db } from "./db";
import { user as dbUser } from "@/src/db/user";
import { eq } from "drizzle-orm";
import { logger } from "./logger";
import { sessions } from "../db/session";
import { stripe } from "./stripe";
import { user } from "../db/user";
import { verificationTokens } from "../db/verificationToken";
import { hash, compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: user,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }) as Adapter,
  pages: {
    signIn: "/auth",
    error: "/auth",
    newUser: "/onboarding",
  },
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        firstname: { label: "Prénom", type: "text" },
        name: { label: "Nom", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        const userFirstname = credentials.firstname as string;
        const userName = credentials.name as string;
        const userEmail = credentials.email as string;
        const userPassword = credentials.password as string;

        if (!userEmail || !userPassword) {
          throw new Error("Missing credentials");
        }

        const user = (await db.query.user.findFirst({
          where: eq(dbUser.email, userEmail),
          columns: {
            id: true,
            email: true,
            emailVerified: true,
            image: true,
            stripeId: true,
            lang: true,
            isPro: true,
            isAdmin: true,
            locked: true,
            phone: true,
            password: true,
          },
        })) as AdapterUser;

        if (user) {
          if (!user.password) {
            throw new AuthError("Missing password");
          }

          const isAuthenticated = await handleComparePassword(
            user.password!,
            userPassword,
          );

          if (isAuthenticated) {
            return user;
          } else {
            return null;
          }
        }

        if (!user) {
          if (!userFirstname || !userName) {
            throw new AuthError("Missing credentials");
          }

          const hashPassword = await handleCryptPassword(userPassword);

          const stripeCustomer = await stripe.customers.create({
            email: userEmail,
            name: userName ?? "",
          });

          const createUser = await db
            .insert(dbUser)
            .values({
              name: userName,
              firstname: userFirstname,
              email: userEmail,
              password: hashPassword,
              stripeId: stripeCustomer.id,
            })
            .returning()
            .execute()
            .then((res) => res[0]);

          const user = {
            id: createUser.id,
            email: createUser.email,
            emailVerified: createUser.emailVerified,
            image: createUser.image,
            stripeId: createUser.stripeId,
            isPro: createUser.isPro,
            lang: createUser.lang,
            isAdmin: createUser.isAdmin,
            locked: createUser.locked,
            phone: createUser.phone,
            password: createUser.password,
          };

          return user;
        }

        throw new AuthError("User not found");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      const userId = user.id;
      const userEmail = user.email;

      if (!userId || !userEmail) {
        logger.error("User not created, missing userId or userEmail");
        return;
      }

      const stripeCustomer = await stripe.customers.create({
        email: userEmail,
        name: user.name ?? "",
      });

      await db
        .update(dbUser)
        .set({
          stripeId: stripeCustomer.id,
        })
        .where(eq(dbUser.id, userId))
        .execute();
    },
  },
  session: { strategy: "jwt" },
});

const handleCryptPassword = async (password: string) => {
  return await hash(password, 10);
};

const handleComparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await compare(password, hashedPassword);
};
