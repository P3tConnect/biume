"use server";

import { headers } from "next/headers";
import { ActionError } from "./action-utils";
import { auth, Session } from "./auth";

export const authMiddleware = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
      throw new ActionError("User not found!");
    }

    return user;
  } catch (error) {
    throw new ActionError("User not found!");
  }
};

export const ownerMiddleware = async (session: Session) => {
  const organization = await auth.api.getFullOrganization({
    headers: await headers(),
  });

  if (!organization) {
    throw new ActionError("User is not a member of any organization!");
  }

  const membership = await auth.api.getActiveMember({
    headers: await headers(),
    organizationId: organization.id,
    userId: session.user.id,
  });

  if (!membership) {
    throw new ActionError("User is not a member of any organization!");
  }

  if (membership.role !== "owner") {
    throw new ActionError("User is not an owner of the organization!");
  }

  return {
    organization,
    user: session.user,
  };
};

export const memberMiddleware = async (session: Session) => {
  const organization = await auth.api.getFullOrganization({
    headers: await headers(),
  });

  if (!organization) {
    throw new ActionError("User is not a member of any organization!");
  }

  const membership = await auth.api.getActiveMember({
    headers: await headers(),
    organizationId: organization.id,
    userId: session.user.id,
  });

  if (!membership) {
    throw new ActionError("User is not a member of any organization!");
  }

  if (membership.role !== "member") {
    throw new ActionError("User is not a member of the organization!");
  }

  return {
    organization,
    user: session.user,
  };
};
