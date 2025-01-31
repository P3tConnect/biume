"use server";

import {
  ActionError,
  createServerAction,
  requireOwner,
  requireAuth,
} from "../lib";
import { auth } from "../lib/auth";
import { organization } from "../db";
import { CreateOrganizationSchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { proInformationsSchema } from "@/components/onboarding/types/onboarding-schemas";
import { progression as progressionTable } from "../db";

export const createOrganization = createServerAction(
  proInformationsSchema,
  async (input, ctx) => {
    const data = input;

    console.log(ctx.user, "user");

    const result = await auth.api.createOrganization({
      body: {
        name: data.name as string,
        slug: data.name?.toLowerCase().replace(/\s+/g, "-") as string,
        logo: data.logo,
        metadata: {},
        userId: ctx.user?.id,
      },
    });

    if (!result) {
      throw new ActionError("Organization not created");
    }

    // Créer une progression
    const [progression] = await db
      .insert(progressionTable)
      .values({
        docs: false,
        cancelPolicies: false,
        reminders: false,
        services: false,
      })
      .returning();

    await db
      .update(organization)
      .set({
        coverImage: data.coverImage,
        description: data.description,
        progressionId: progression.id,
        companyType: data.companyType,
        atHome: data.atHome,
      })
      .where(eq(organization.id, result?.id as string))
      .execute();

    await auth.api.setActiveOrganization({
      body: {
        organizationId: result?.id,
      },
    });
  },
  [requireAuth, requireOwner],
);

export const updateOrganization = createServerAction(
  CreateOrganizationSchema,
  async (input, ctx) => {
    const data = await db
      .update(organization)
      .set({
        name: input.name,
        email: input.email,
        description: input.description,
        logo: input.logo,
        addressId: input.addressId,
        openAt: input.openAt,
        closeAt: input.closeAt,
        atHome: input.atHome,
        nac: input.nac,
        siren: input.siren,
        siret: input.siret,
      })
      .where(eq(organization.id, input.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Organization not updated");
    }

    return data;
  },
  [requireAuth, requireOwner],
);
