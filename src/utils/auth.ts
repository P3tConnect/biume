import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { user } from "../db/user";
import { sessions } from "../db/session";
import { accounts } from "../db/accounts";
import { verificationTokens } from "../db/verificationToken";
import { authenticators } from "../db/verificators";
import { Adapter } from "next-auth/adapters";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: user,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
        authenticatorsTable: authenticators,
    }) as Adapter,
    providers: [],
});
