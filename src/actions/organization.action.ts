"use server";

import { authedAction, ownerAction } from "../lib/action";
import { auth } from "../lib/auth";
import { ZSAError } from "zsa";
import { informationsSchema } from "@/components/onboarding/components/pro/informations-form";
import { z } from "zod";
import { headers } from "next/headers";
import { organization } from "../db";
import { CreateOrganizationSchema } from "../db";
import { db } from "../lib";
import { eq } from "drizzle-orm";

const updateOrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  metadata: z.record(z.any()),
  logo: z.string().optional(),
});

export const createOrganization = authedAction
  .input(informationsSchema)
  .handler(async ({ input, ctx }) => {
    const data = input;

    const result = await auth.api.createOrganization({
      body: {
        name: data.name,
        logo: data.logo as string,
        slug: data.name.toLowerCase().replace(/\s+/g, "-"),
        userId: ctx.user.id,
        metadata: {},
      },
    });

    if (!result) {
      throw new ZSAError("INTERNAL_SERVER_ERROR", "Organization not created");
    }
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
