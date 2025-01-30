"use server";

import { authedAction, ownerAction, ActionError } from "../lib";
import { auth } from "../lib/auth";
import { z } from "zod";
import { headers } from "next/headers";
import { organization } from "../db";
import { CreateOrganizationSchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { proInformationsSchema } from "@/components/onboarding/types/onboarding-schemas";
import { progression as progressionTable } from "../db";

export const createOrganization = authedAction
  .schema(proInformationsSchema)
  .action(async ({ ctx, parsedInput }) => {
    const data = parsedInput;

    console.log(ctx.user, "user");

    const result = await auth.api.createOrganization({
      body: {
        name: data.name as string,
        slug: data.name?.toLowerCase().replace(/\s+/g, "-") as string,
        logo: data.logo,
        metadata: {},
        userId: ctx?.user.id,
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
  });

export const updateOrganization = ownerAction
  .schema(CreateOrganizationSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(organization)
      .set({
        name: parsedInput.name,
        email: parsedInput.email,
        description: parsedInput.description,
        logo: parsedInput.logo,
        addressId: parsedInput.addressId,
        openAt: parsedInput.openAt,
        closeAt: parsedInput.closeAt,
        atHome: parsedInput.atHome,
        nac: parsedInput.nac,
        siren: parsedInput.siren,
        siret: parsedInput.siret,
      })
      .where(eq(organization.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Organization not updated");
    }

    return data;
  });
