'use server';

import { ActionError, createServerAction, db, requireAuth } from '../lib';
import { clientSettingsSchema } from '@/components/dashboard/pages/user/settings-page/types/settings-schema';
import { auth } from '../lib/auth';
import { headers } from 'next/headers';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { user } from '../db';
import { Router } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const getUserInformations = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const data = await db.query.user.findFirst({
      where: eq(user.id, ctx.user?.id ?? ''),
    });

    if (!data) {
      throw new ActionError('User not found');
    }

    return data;
  },
  [requireAuth]
);
export const updateUserInformations = createServerAction(
  clientSettingsSchema,
  async (input, ctx) => {
    const user = await auth.api.updateUser({
      headers: await headers(),
      body: {
        name: input.name,
        image: input.image,
        address: input.address,
        country: input.country,
        city: input.city,
        zipCode: input.zipCode,
        phoneNumber: input.phoneNumber,
        smsNotifications: input.smsNotifications,
        emailNotifications: input.emailNotifications,
        twoFactorEnabled: input.twoFactorEnabled,
      },
    });

    if (!user) {
      throw new ActionError('User not updated');
    }

    return user;
  },
  [requireAuth]
);
