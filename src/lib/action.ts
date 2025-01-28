import { ZSAError, createServerAction, createServerActionProcedure } from "zsa";

import { auth } from "./auth";
import { currentUser } from "./current-user";

export const action = createServerAction();

const authedProcedure = createServerActionProcedure().handler(
  async ({ request }) => {
    try {
      const session = await auth.api.getSession({
        headers: request?.headers!,
      });

      const user = session?.user;

      if (!user) {
        throw new ZSAError("NOT_AUTHORIZED", "You must be logged in !");
      }

      return {
        user,
      };
    } catch (err) {
      throw new ZSAError("NOT_AUTHORIZED", "You must be logged in !");
    }
  },
);

export const authedAction = authedProcedure.createServerAction();

const organizationProcedure = createServerActionProcedure(
  authedProcedure,
).handler(async ({ ctx, request }) => {
  try {
    const organization = await auth.api.getFullOrganization({
      headers: request?.headers!,
    });

    if (!organization) {
      throw new ZSAError(
        "NOT_AUTHORIZED",
        "You need to be in a company to perform this action",
      );
    }

    return {
      user: ctx.user,
      organization,
    };
  } catch (err) {
    throw new ZSAError(
      "INTERNAL_SERVER_ERROR",
      "Error when trying to retreive organization",
    );
  }
});

export const organizationAction = organizationProcedure.createServerAction();

const memberProcedure = createServerActionProcedure(
  organizationProcedure,
).handler(async ({ ctx, request }) => {
  try {
    const membership = await auth.api.getActiveMember();
  } catch (error) {}
  if (ctx.user && request?.headers) {
    const org = await auth.api.getFullOrganization({
      headers: request.headers,
    });

    if (!org) {
      throw new ZSAError("NOT_FOUND", "Organization not found");
    }

    const membership = await auth.api.getActiveMember();

    if (membership?.role != "member") {
      throw new ZSAError(
        "NOT_AUTHORIZED",
        "You need to be a member of a company to perform this action",
      );
    }

    return {
      user: ctx.user,
      org,
    };
  }

  throw new ZSAError(
    "NOT_AUTHORIZED",
    "You need to be in a company to perform this action",
  );
});

export const memberAction = memberProcedure.createServerAction();

export const ownerProcedure = createServerActionProcedure(
  authedProcedure,
).handler(async ({ ctx, request }) => {
  if (ctx.user) {
    const org = await auth.api.getFullOrganization({
      headers: request?.headers!,
    });

    if (!org) {
      throw new ZSAError(
        "NOT_AUTHORIZED",
        "You need to be in a company to perform this action",
      );
    }

    const membership = await auth.api.getActiveMember();

    if (membership?.role != "owner") {
      throw new ZSAError(
        "NOT_AUTHORIZED",
        "You need to be an owner of a company to perform this action",
      );
    }

    return {
      user: ctx.user,
      org,
    };
  }

  throw new ZSAError(
    "NOT_AUTHORIZED",
    "You need to be in a company to perform this action",
  );
});

export const ownerAction = ownerProcedure.createServerAction();
