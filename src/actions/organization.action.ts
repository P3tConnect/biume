"use server";

import { authedAction } from "../lib/action";
import { auth } from "../lib/auth";
import { ZSAError } from "zsa";
import { informationsSchema } from "@/components/onboarding/components/pro/informations-form";

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
