import { z } from "zod";
import { CreateWidgetsSchema, widgets } from "../db";
import { db, ownerAction } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getWidgets = ownerAction.handler(async () => {});

export const createWidget = ownerAction
  .input(CreateWidgetsSchema)
  .handler(async ({ input }) => {
    const data = await db.insert(widgets).values(input).returning().execute();

    if (!data) {
      throw new ZSAError("ERROR", "Widget not created");
    }

    return data;
  });

export const updateWidget = ownerAction
  .input(CreateWidgetsSchema)
  .handler(async ({ input }) => {
    const data = await db
      .update(widgets)
      .set(input)
      .where(eq(widgets.id, input.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Widget not updated");
    }

    return data;
  });

export const deleteWidget = ownerAction
  .input(z.string())
  .handler(async ({ input }) => {
    const data = await db
      .delete(widgets)
      .where(eq(widgets.id, input))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Widget not deleted");
    }
  });
