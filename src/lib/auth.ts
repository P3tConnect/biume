import OrganizationInvitation from "@/emails/OrganizationInvitation";
import {
  account,
  invitation,
  member as memberSchema,
  organization as organizationSchema,
  session,
  twoFactor as twoFactorSchema,
  verification,
} from "../db";
import { organization, twoFactor, username } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { createAccessControl } from "better-auth/plugins/access";
import { db } from "./db";
import { user as dbUser } from "../db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq } from "drizzle-orm";
import { nextCookies } from "better-auth/next-js";
import { stripe } from "./stripe";
import { resend } from "./resend";

const statement = {
  project: ["create", "share", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const member = ac.newRole({
  project: ["create"],
});

export const admin = ac.newRole({
  project: ["create", "update"],
});

export const owner = ac.newRole({
  project: ["create", "update", "delete"],
});

export const auth = betterAuth({
  appName: "Biume",
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
      },
      smsNotifications: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      emailNotifications: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
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
            .set({ stripeId: customer.id })
            .where(eq(dbUser.id, user.id));
        },
      },
      update: {
        after: async (user) => {
          await db
            .update(dbUser)
            .set({ updatedAt: new Date() })
            .where(eq(dbUser.id, user.id));
        },
      },
    },
  },
  plugins: [
    nextCookies(),
    username(),
    twoFactor(),
    organization({
      ac: ac,
      roles: {
        member,
        admin,
        owner,
      },
      sendInvitationEmail: async (data, request) => {
        console.log(data, request);
        const { email, inviter, role, organization } = data;

        await resend.emails.send({
          from: "PawThera <onboarding@pawthera.com>",
          to: email,
          subject: "Invitation à rejoindre l'organisation",
          react: OrganizationInvitation({
            inviterName: inviter.user.name,
            organizationName: organization.name,
            inviteLink: `${process.env.NEXT_PUBLIC_APP_URL}/invite/${data.id}`,
          }),
        });
      },
      membershipLimit: 10,
    }),
  ],
});

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session;
export type Organization = typeof auth.$Infer.Organization & {
  members: (typeof auth.$Infer.Member)[];
  invitations: (typeof auth.$Infer.Invitation)[];
};
