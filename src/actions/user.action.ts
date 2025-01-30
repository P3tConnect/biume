'use server';

import { authedAction, db } from '../lib';
import { CreateUserSchema, user } from '../db';
import { ZSAError } from 'zsa';
import { eq } from 'drizzle-orm';

export const updateUser = authedAction
  .schema(CreateUserSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(user)
      .set(parsedInput)
      .where(eq(user.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError('ERROR', 'User not updated');
    }

    return data;
  });
