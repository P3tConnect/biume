'use server';

import { authedAction, db } from '../lib';
import { CreateUserSchema, user } from '../db';
import { ZSAError } from 'zsa';
import { eq } from 'drizzle-orm';

export const updateUser = clientAction.input(clientSettingsSchema);
export const updateUser = authedAction
  .input(CreateUserSchema)
  .handler(async ({ input }) => {
    const data = input;
    const result = await auth.api.updateUser({
      body: data,
    });

    if (result.status === false) {
      throw new ZSAError('ERROR', 'User not updated');
    }
  });
