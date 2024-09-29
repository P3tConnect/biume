import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Resend from "next-auth/providers/resend";
import { db } from "./db";
import { user } from "../db/user";
import { sessions } from "../db/session";
import { accounts } from "../db/accounts";
import { verificationTokens } from "../db/verificationToken";
import { authenticator } from "../db";
import { Adapter, AdapterUser } from "next-auth/adapters";
import { logger } from "./logger";
import { stripe } from "./stripe";
import { user as dbUser } from "@/src/db";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: user,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticator,
  }) as Adapter,
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        const userEmail = credentials.email as string;
        const userPassword = credentials.password as string;

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

        if (!user) {
          logger.debug("User not found");

          // const hashedPassword = await handleCryptPassword(userPassword);

          const createUser = await db
            .insert(dbUser)
            .values({
              email: userEmail,
              password: userPassword,
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

        // if (!(await handleComparePassword(userPassword, user.password!))) {
        //   logger.debug("Password not correct");
        //   return null;
        // }

        return user;
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
});
