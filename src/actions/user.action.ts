'use server';

import { clientAction, db } from '../lib';
import { ZSAError } from 'zsa';
import { auth } from '../lib/auth';
import { clientSettingsSchema } from '@/components/dashboard/pages/user/settings-page/client-setting-form';

export const updateUser = clientAction
  .input(clientSettingsSchema)
  .handler(async ({ input }) => {
    const data = input;
    const result = await auth.api.updateUser({
      body: data,
    });

    if (result.status === false) {
      throw new ZSAError('ERROR', 'User not updated');
    }
  });
