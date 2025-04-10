import { createServerAction, requireOwner } from "@/src/lib"
import { db } from "@/src/lib/db"
import { cancelPolicies } from "@/src/db/cancelPolicies"
import { eq } from "drizzle-orm"
import { z } from "zod"

export const GET = createServerAction(
  z.object({}),
  async (_, ctx) => {
    if (!ctx.organization) {
      return new Response("Organization not found", { status: 404 })
    }

    const policies = await db
      .select()
      .from(cancelPolicies)
      .where(eq(cancelPolicies.organizationId, ctx.organization.id))

    return Response.json(policies)
  },
  [requireOwner]
)

export const POST = createServerAction(
  z.object({
    daysBefore: z.number().min(0).max(14, "Le délai maximum est de 14 jours"),
    refundPercent: z.number().min(0).max(100),
  }),
  async (input, ctx) => {
    if (!ctx.organization) {
      return new Response("Organization not found", { status: 404 })
    }

    const policy = await db.insert(cancelPolicies).values({
      daysBefore: input.daysBefore,
      refundPercent: input.refundPercent,
      organizationId: ctx.organization.id,
    })

    return Response.json(policy)
  },
  [requireOwner]
) 