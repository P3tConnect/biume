import { input } from "./../config/primitives";
("use server");

import { z } from "zod";
import { CreateNewsletterSchema, newsletter } from "../db";
import { clientAction, companyAction } from "../lib/action";
import { db } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getNewsletters = clientAction.handler(async () => {});

export const createNewsletter = companyAction
  .input(CreateNewsletterSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(newsletter)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Newsletter not created");
    }

    return data;
  });

export const updateNewsletter = companyAction
  .input(CreateNewsletterSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(newsletter)
      .set(input)
      .where(eq(newsletter.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Newsletter not updated");
    }

    return data;
  });

export const deleteNewsletter = companyAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(newsletter)
      .where(eq(newsletter.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Newsletter not deleted");
    }
  });
