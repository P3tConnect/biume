import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { organization, twoFactor, username } from "better-auth/plugins"
import { createAccessControl } from "better-auth/plugins/access"
import { eq } from "drizzle-orm"

import OrganizationInvitation from "@/emails/OrganizationInvitation"

import {
  account,
  invitation,
  member as memberSchema,
  organization as organizationSchema,
  session,
  twoFactor as twoFactorSchema,
  verification,
} from "../db"
import { user as dbUser } from "../db"
import { db } from "./db"
import { safeConfig } from "./env"
import { resend } from "./resend"
import { stripe } from "./stripe"

const statement = {
  project: ["create", "share", "update", "delete"],
} as const

export const ac = createAccessControl(statement)

export const member = ac.newRole({
  project: ["create"],
})

export const admin = ac.newRole({
  project: ["create", "share", "update"],
})

export const owner = ac.newRole({
  project: ["create", "share", "update", "delete"],
})

// Define base types
export type BaseUser = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
}

export type BaseMember = {
  id: string
  role: string
  userId: string
  organizationId: string
}

export type BaseInvitation = {
  id: string
  email: string
  role: string
  organizationId: string
}

export type BaseOrganization = {
  id: string
  name: string
  members: BaseMember[]
  invitations: BaseInvitation[]
}

export const auth = betterAuth({
  appName: "Biume",
  secret: safeConfig.BETTER_AUTH_SECRET,
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
        after: async user => {
          const username = user.name
          const email = user.email

          const customer = await stripe.customers.create({
            name: username,
            email,
          })

          await db.update(dbUser).set({ stripeId: customer.id }).where(eq(dbUser.id, user.id))
        },
      },
      update: {
        after: async user => {
          await db.update(dbUser).set({ updatedAt: new Date() }).where(eq(dbUser.id, user.id))
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
        console.log(data, request)
        const { email, inviter, role, organization } = data

        await resend.emails.send({
          from: "PawThera <onboarding@pawthera.com>",
          to: email,
          subject: "Invitation à rejoindre l'organisation",
          react: OrganizationInvitation({
            inviterName: inviter.user.name,
            organizationName: organization.name,
            inviteLink: `${process.env.NEXT_PUBLIC_APP_URL}/invite/${data.id}`,
          }),
        })
      },
      membershipLimit: 10,
    }),
  ],
})

// Export inferred types
export type User = BaseUser & typeof auth.$Infer.Session.user
export type Session = typeof auth.$Infer.Session
export type Organization = BaseOrganization & typeof auth.$Infer.Organization
