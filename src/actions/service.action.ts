"use server";

import { z } from "zod";
import { ownerAction, db, authedAction, ActionError } from "../lib";
import { CreateServiceSchema, service } from "../db";
import { eq } from "drizzle-orm";
import { proServicesSchema } from "@/components/onboarding/types/onboarding-schemas";
import { auth } from "../lib/auth";
import { headers } from "next/headers";

export const getServices = authedAction.action(async () => {});

export const createService = ownerAction
  .schema(proServicesSchema)
  .action(async ({ parsedInput }) => {});

export const createServicesStepAction = authedAction
  .schema(proServicesSchema)
  .action(async ({ parsedInput }) => {
    const organization = await auth.api.getFullOrganization({
      headers: await headers(),
    });
    if (!organization) return;
    const services = parsedInput.services;

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
  });

export const updateService = ownerAction
  .schema(CreateServiceSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(service)
      .set(parsedInput)
      .where(eq(service.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Service not updated");
    }

    return data;
  });

export const deleteService = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(service)
      .where(eq(service.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Service not deleted");
    }
  });
