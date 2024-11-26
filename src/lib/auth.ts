import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization, twoFactor } from "better-auth/plugins";
import { db } from "./db";
import { user } from "../db";
import {
  organization as organizationSchema,
  account,
  verification,
  twoFactor as twoFactorSchema,
  session,
  member as memberSchema,
  invitation,
} from "../db";
import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  organization: ["create", "share", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const member = ac.newRole({
  organization: ["create"],
});

export const admin = ac.newRole({
  organization: ["create", "update"],
});

export const owner = ac.newRole({
  organization: ["create", "update", "delete"],
});

export const auth = betterAuth({
  appName: "PawThera",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      organizations: organizationSchema,
      users: user,
      accounts: account,
      verifications: verification,
      twoFactors: twoFactorSchema,
      sessions: session,
      invitations: invitation,
      members: memberSchema,
    },
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      isPro: {
        type: "boolean",
        defaultValue: false,
        required: true,
      },
      onBoardingComplete: {
        type: "boolean",
        defaultValue: false,
        required: true,
      },
      stripeId: {
        type: "string",
        defaultValue: "",
      },
    },
  },
  plugins: [
    nextCookies(),
    twoFactor(),
    organization({
      ac: ac,
      roles: {
        member,
        admin,
        owner,
      },
    }),
  ],
});

type Session = typeof auth.$Infer.Session;
type Organization = typeof auth.$Infer.Organization;
