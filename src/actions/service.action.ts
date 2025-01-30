"use server";

import { z } from "zod";
import { ownerAction, db, authedAction } from "../lib";
import { CreateServiceSchema, service } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";
import { proServicesSchema } from "@/components/onboarding/types/onboarding-schemas";
import { auth } from "../lib/auth";

export const getServices = authedAction.handler(async () => {});

export const createService = ownerAction
  .input(proServicesSchema)
  .handler(async ({ input }) => {});

export const createServicesStepAction = authedAction
  .input(proServicesSchema)
  .handler(async ({ request, input }) => {
    const organization = await auth.api.getFullOrganization({
      headers: request?.headers!,
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
      throw new ZSAError("ERROR", "Services not created");
    }
  });

export const updateService = ownerAction
  .input(CreateServiceSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(service)
      .set(input)
      .where(eq(service.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Service not updated");
    }

    return data;
  });

export const deleteService = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(service)
      .where(eq(service.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Service not deleted");
    }
  });
