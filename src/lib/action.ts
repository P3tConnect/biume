'use server';

import { headers } from 'next/headers';
import { auth } from './auth';
import { ActionError, ServerActionContext } from './action-utils';

// Predefined middlewares
export async function requireAuth(ctx: ServerActionContext) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
      throw new ActionError('Not authenticated');
    }

    Object.assign(ctx, {
      user,
      organization: null,
      meta: {},
    });
  } catch (error) {
    throw new ActionError('Not authenticated');
  }
}

export async function requireOwner(ctx: ServerActionContext) {
  const organization = await auth.api.getFullOrganization({
    headers: await headers(),
  });

  if (!organization) {
    throw new Error('Organization required');
  }

  const membership = await auth.api.getActiveMember({
    headers: await headers(),
    organizationId: organization.id,
    userId: ctx.user?.id,
  });

  if (!membership) {
    throw new Error('User is not a member of any organization!');
  }

  if (membership?.role !== 'owner') {
    throw new Error('User is not an owner of the organization!');
  }

  Object.assign(ctx, {
    user: ctx.user,
    organization,
    meta: {},
  });
}

export async function requireOrganization(ctx: ServerActionContext) {
  const organization = await auth.api.getFullOrganization({
    headers: await headers(),
  });

  if (!organization) {
    throw new Error("Organization required");
  }

  Object.assign(ctx, { organization });
}

export async function requireMember(ctx: ServerActionContext) {
  const organization = await auth.api.getFullOrganization({
    headers: await headers(),
  });

  if (!organization) {
    throw new ActionError('User is not a member of any organization!');
  }

  if (!ctx.user) {
    throw new Error('Not authenticated');
  }

  const membership = await auth.api.getActiveMember({
    headers: await headers(),
    organizationId: ctx.organization?.id,
    userId: ctx.user?.id,
  });

  if (!membership) {
    throw new Error('User is not a member of the organization!');
  }

  if (membership?.role !== 'member') {
    throw new Error('User is not a member of the organization!');
  }

  Object.assign(ctx, {
    user: ctx.user,
    organization: ctx.organization,
    meta: {},
  });
}

// Example usage:
// export const createUser = createServerAction(
//   async (input: CreateUserInput, ctx) => {
//     // Your action logic here
//     return { success: true };
//   },
//   [requireAuth, requireOwner]
// );
