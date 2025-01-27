"use server";

import { authedAction, ownerAction } from "../lib/action";
import { auth } from "../lib/auth";
import { ZSAError } from "zsa";
import { z } from "zod";
import { headers } from "next/headers";
import { organization } from "../db";
import { CreateOrganizationSchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { proInformationsSchema } from "@/components/onboarding/types/onboarding-schemas";
import { progression as progressionTable } from "../db";

const updateOrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  metadata: z.record(z.any()),
  logo: z.string().optional(),
});

export const createOrganization = authedAction
  .input(proInformationsSchema)
  .handler(async ({ input, ctx }) => {
    const data = input;

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
      throw new ZSAError("INTERNAL_SERVER_ERROR", "Organization not created");
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
  .input(CreateOrganizationSchema)
  .handler(async ({ input }) => {
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
      throw new ZSAError("ERROR", "Organization not updated");
    }

    return data;
  });
