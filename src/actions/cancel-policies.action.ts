"use server"

import { createServerAction, requireAuth, requireFullOrganization, requireOwner } from "@/src/lib"
import { db } from "@/src/lib/db"
import { cancelPolicies } from "@/src/db/cancelPolicies"
import { eq } from "drizzle-orm"
import { z } from "zod"

export const getCancelPolicies = createServerAction(
  z.object({}),
  async (_, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organization not found")
    }

    const policies = await db
      .select()
      .from(cancelPolicies)
      .where(eq(cancelPolicies.organizationId, ctx.organization.id))

    return policies
  },
  [requireAuth, requireFullOrganization]
)

export const createCancelPolicy = createServerAction(
  z.object({
    daysBefore: z.number().min(0),
    refundPercent: z.number().min(0).max(100),
  }),
  async (input, ctx) => {
    if (!ctx.organization) {
      throw new Error("Organization not found")
    }

    const policy = await db.insert(cancelPolicies).values({
      daysBefore: input.daysBefore,
      refundPercent: input.refundPercent,
      organizationId: ctx.organization.id,
    }).returning().execute();

    return policy
  },
  [requireAuth, requireFullOrganization]
) 