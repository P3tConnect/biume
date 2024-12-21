import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization, phoneNumber, twoFactor } from "better-auth/plugins";
import { db } from "./db";
import { user as dbUser } from "../db";
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
import { stripe } from "./stripe";
import { eq } from "drizzle-orm";
import { FireExtinguisher } from "lucide-react";

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
      users: dbUser,
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
      firstname: {
        type: "string",
        required: true,
        defaultValue: "",
      },
      lastname: {
        type: "string",
        required: true,
        defaultValue: "",
      },
      image: {
        type: "string",
        defaultValue: "",
        required: false,
      },
      isPro: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      onBoardingComplete: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      stripeId: {
        type: "string",
        defaultValue: "",
        required: false,
      },
      address: {
        type: "string",
        defaultValue: "",
        required: false,
      },
      zipCode: {
        type: "string",
        defaultValue: "",
        required: false,
      },
      country: {
        type: "string",
        defaultValue: "",
        required: false,
      },
      city: {
        type: "string",
        defaultValue: "",
        required: false,
      },
      phoneNumber: {
        type: "string",
        defaultValue: "",
        required: false,
      }
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const username = user.name;
          const email = user.email;

          const customer = await stripe.customers.create({
            name: username,
            email,
          });

          await db
            .update(dbUser)
            .set({ stripeId: customer.id})
            .where(eq(dbUser.id, user.id));
        }
      },
      update: {
        after: async (user) => {
          await db.update(dbUser).set({ updatedAt: new Date() }).where(eq(dbUser.id, user.id));
        }
      }
    }
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
