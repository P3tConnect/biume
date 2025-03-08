"use server"

import { eq } from "drizzle-orm"
import { headers } from "next/headers"

import { organization as organizationTable } from "@/src/db"

import { ActionError, ServerActionContext } from "./action-utils"
import { auth } from "./auth"
import { db } from "./db"

// Predefined middlewares
export async function requireAuth(ctx: ServerActionContext) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const user = session?.user

    if (!user) {
      throw new ActionError("Not authenticated")
    }

    Object.assign(ctx, {
      user,
      organization: null,
      meta: {},
    })
  } catch (error) {
    throw new ActionError("Not authenticated")
  }
}

export async function requireOwner(ctx: ServerActionContext) {
  const organization = await auth.api.getFullOrganization({
    headers: await headers(),
  })

  if (!organization) {
    throw new Error("Organization required")
  }

  const membership = await auth.api.getActiveMember({
    headers: await headers(),
    organizationId: organization.id,
    userId: ctx.user?.id,
  })

  if (!membership) {
    throw new Error("User is not a member of any organization!")
  }

  if (membership?.role !== "owner") {
    throw new Error("User is not an owner of the organization!")
  }

  Object.assign(ctx, {
    user: ctx.user,
    organization,
    meta: {},
  })
}

export async function requireFullOrganization(ctx: ServerActionContext) {
  const organization = await auth.api.getFullOrganization({
    headers: await headers(),
  })

  if (!organization) {
    throw new Error("Organization required")
  }

  const fullOrganization = await db.query.organization.findFirst({
    where: eq(organizationTable.id, organization.id),
    with: {
      invitations: {
        columns: {
          id: true,
          role: true,
          email: true,
          status: true,
        },
      },
      members: {
        with: {
          user: {
            columns: {
              id: true,
              name: true,
              email: true,
              image: true,
              stripeId: true,
            },
          },
        },
      },
    },
  })

  Object.assign(ctx, { organization, fullOrganization })
}

export async function requireMember(ctx: ServerActionContext) {
  const organization = await auth.api.getFullOrganization({
    headers: await headers(),
  })

  if (!organization) {
    throw new ActionError("User is not a member of any organization!")
  }

  if (!ctx.user) {
    throw new Error("Not authenticated")
  }

  const membership = await auth.api.getActiveMember({
    headers: await headers(),
    organizationId: ctx.organization?.id,
    userId: ctx.user?.id,
  })

  if (!membership) {
    throw new Error("User is not a member of the organization!")
  }

  if (membership?.role !== "member") {
    throw new Error("User is not a member of the organization!")
  }

  Object.assign(ctx, {
    user: ctx.user,
    organization: ctx.organization,
  })
}
