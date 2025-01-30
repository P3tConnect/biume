'use server';

import { auth } from './auth';
import { headers } from 'next/headers';
import { createMiddleware } from 'next-safe-action';
import { ActionError } from './action-utils';

export const authedMiddleware = createMiddleware().define(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    throw new ActionError('User not found!');
  }

  return next({ ctx: { user } });
});

export const ownerMiddleware = createMiddleware().define(async ({ next }) => {
  const organization = await auth.api.getFullOrganization({
    headers: await headers(),
  });

  if (!organization) {
    throw new ActionError('User is not a member of any organization!');
  }

  return next({ ctx: { organization } });
});
