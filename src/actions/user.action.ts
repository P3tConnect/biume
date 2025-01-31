'use server';

import {
  db,
  ActionError,
  createServerAction,
  requireOwner,
  requireAuth,
} from '../lib';
import { CreateUserSchema, session, user } from '../db';
import { eq } from 'drizzle-orm';
import { clientSettingsSchema } from '@/components/dashboard/pages/user/settings-page/types/settings-schema';

export const updateUserInformations = createServerAction(
  clientSettingsSchema,
  async (input, ctx) => {
    if (!ctx.user) return;
    const data = await db
      .update(user)
      .set(input)
      .where(eq(user.id, ctx.user.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError('User not updated');
    }

    return data;
  },
  [requireAuth]
);
