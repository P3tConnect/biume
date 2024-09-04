import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { user } from "../db/user";
import { sessions } from "../db/session";
import { accounts } from "../db/accounts";
import { verificationTokens } from "../db/verificationToken";
import { authenticator } from "../db";
import { Adapter } from "next-auth/adapters";
import { logger } from "./logger";
import { stripe } from "./stripe";
import { user as dbUser } from "@/src/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: user,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticator,
  }) as Adapter,
  providers: [],
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

      await db.update(dbUser).set({
        stripeId: stripeCustomer.id,
      }).execute();
    },
  }
});
