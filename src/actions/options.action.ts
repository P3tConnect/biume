"use server";

import { z } from "zod";
import { clientAction, ownerAction, db } from "../lib";
import { CreateOptionSchema, options } from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getOptions = clientAction.handler(async () => {});

export const createOption = ownerAction
  .input(CreateOptionSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(options).values(input).returning().execute();
    if (!data) {
      throw new ZSAError("ERROR", "Option not created");
    }
    return data;
  });

export const updateOption = ownerAction
  .input(CreateOptionSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(options)
      .set(input)
      .where(eq(options.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Option not updated");
    }

    return data;
  });

export const deleteOption = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(options)
      .where(eq(options.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Option not deleted");
    }
  });
