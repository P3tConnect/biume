"use server";

import { z } from "zod";
import { createServerAction, requireAuth, requireOwner } from "@/src/lib";

// Schema
const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

// Custom middleware
async function validateEmailDomain(ctx: { meta?: Record<string, unknown> }) {
  ctx.meta = {
    ...ctx.meta,
    allowedDomains: ["example.com"],
  };
}

// Create the action with schema validation and middleware
export const createUser = createServerAction(
  createUserSchema,
  async (input, ctx) => {
    if (!ctx?.organization?.id) {
      throw new Error("Organization required");
    }

    const allowedDomains = ctx.meta?.allowedDomains as string[];
    const emailDomain = input.email.split("@")[1];

    if (!allowedDomains.includes(emailDomain)) {
      throw new Error("Email domain not allowed");
    }

    // Simulation of a database operation
    const id = Math.random().toString(36).substring(7);

    return {
      id,
      name: input.name,
      email: input.email,
      organizationId: ctx.organization.id,
    };
  },
  [requireAuth, requireOwner],
);
