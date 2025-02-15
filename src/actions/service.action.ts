"use server";

import { z } from "zod";
import {
  db,
  ActionError,
  createServerAction,
  requireOwner,
  requireAuth,
  requireFullOrganization,
} from "../lib";
import { CreateServiceSchema, Service, service } from "../db";
import { eq } from "drizzle-orm";
import { proServicesSchema } from "@/components/onboarding/types/onboarding-schemas";
import { auth } from "../lib/auth";
import { headers } from "next/headers";

export const getServices = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const organization = await auth.api.getFullOrganization({
      headers: await headers(),
    });
    if (!organization) return [];

    const services = await db
      .select()
      .from(service)
      .where(eq(service.organizationId, organization.id))
      .execute();

    return services;
  },
  [requireAuth],
);

export const getServicesFromOrganization = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const services = await db.query.service.findMany({
      where: eq(service.organizationId, ctx.organization?.id as string),
    });

    if (!services) {
      throw new ActionError("Services not found");
    }

    return services as unknown as Service[];
  },
  [requireAuth, requireFullOrganization],
);

export const createService = createServerAction(
  CreateServiceSchema,
  async (input, ctx) => {
    const organization = await auth.api.getFullOrganization({
      headers: await headers(),
    });
    if (!organization) {
      throw new ActionError("Organization not found");
    }

    const result = await db
      .insert(service)
      .values({
        ...input,
        organizationId: organization.id,
      })
      .returning()
      .execute();

    if (!result) {
      throw new ActionError("Service not created");
    }

    return result[0];
  },
  [requireAuth],
);

export const createServicesStepAction = createServerAction(
  proServicesSchema,
  async (input, ctx) => {
    const organization = await auth.api.getFullOrganization({
      headers: await headers(),
    });
    if (!organization) return;
    const services = input.services;

    const result = await db
      .insert(service)
      .values(
        services.map((service) => ({
          ...service,
          organizationId: organization.id,
        })),
      )
      .returning()
      .execute();

    if (!result) {
      throw new ActionError("Services not created");
    }

    return result;
  },
  [requireAuth, requireFullOrganization],
);

export const updateService = createServerAction(
  CreateServiceSchema,
  async (input, ctx) => {
    const data = await db
      .update(service)
      .set(input)
      .where(eq(service.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Service not updated");
    }

    return data;
  },
  [requireAuth],
);

export const deleteService = createServerAction(
  z.string(),
  async (input, ctx) => {
    const data = await db
      .delete(service)
      .where(eq(service.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Service not deleted");
    }
  },
  [requireAuth],
);
