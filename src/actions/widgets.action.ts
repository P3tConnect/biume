import { z } from "zod";
import { CreateWidgetsSchema, widgets } from "../db";
import { ActionError, db, proAction } from "../lib";
import { eq } from "drizzle-orm";

export const getWidgets = proAction.action(async ({ ctx }) => {});

export const createWidget = proAction
  .schema(CreateWidgetsSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(widgets)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Widget not created");
    }

    return data;
  });

export const updateWidget = proAction
  .schema(CreateWidgetsSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(widgets)
      .set(parsedInput)
      .where(eq(widgets.id, parsedInput.id))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Widget not updated");
    }

    return data;
  });

export const deleteWidget = proAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(widgets)
      .where(eq(widgets.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Widget not deleted");
    }
  });
