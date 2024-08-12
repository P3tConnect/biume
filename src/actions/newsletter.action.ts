"use server";

import { z } from "zod";
import { CreateNewsletterSchema, newsletter } from "../db";
import { ActionError, proAction, userAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";

export const getNewsletters = userAction.action(async () => {});

export const createNewsletter = proAction
  .schema(CreateNewsletterSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(newsletter)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Newsletter not created");
    }

    return data;
  });

export const updateNewsletter = proAction
  .schema(CreateNewsletterSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(newsletter)
      .set(parsedInput)
      .where(eq(newsletter.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Newsletter not updated");
    }

    return data;
  });

export const deleteNewsletter = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(newsletter)
      .where(eq(newsletter.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Newsletter not deleted");
    }
  });
