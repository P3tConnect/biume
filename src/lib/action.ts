'use server';

import { headers } from 'next/headers';
import { auth } from './auth';
import { z } from 'zod';
import { ActionError, ServerActionContext } from './action-utils';

// Predefined middlewares
export async function requireAuth(ctx: ServerActionContext) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) {
    throw new ActionError('User not found!');
    throw new Error('Not authenticated');
  }

  ctx = {
    ...ctx,
    user: user,
  };
}

export async function requireOwner(ctx: ServerActionContext) {
  if (!ctx.user) {
    throw new Error('Not authenticated');
  }

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

  ctx = {
    ...ctx,
    organization,
  };
}

export async function requireMember(ctx: ServerActionContext) {
  const organization = await auth.api.getFullOrganization({
    headers: await headers(),
  });

  if (!organization) {
    throw new ActionError('User is not a member of any organization!');
    throw new Error('Organization required');
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

  ctx = {
    ...ctx,
    user: ctx.user,
    organization: ctx.organization,
  };
}

// Example usage:
// export const createUser = createServerAction(
//   async (input: CreateUserInput, ctx) => {
//     // Your action logic here
//     return { success: true };
//   },
//   [requireAuth, requireOwner]
// );
