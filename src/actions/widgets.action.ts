import { z } from "zod";
import { CreateWidgetsSchema, widgets } from "../db";
import { db, ownerAction } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getWidgets = ownerAction.action(async () => {});

export const createWidget = ownerAction
  .schema(CreateWidgetsSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(widgets)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Widget not created");
    }

    return data;
  });

export const updateWidget = ownerAction
  .schema(CreateWidgetsSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(widgets)
      .set(parsedInput)
      .where(eq(widgets.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Widget not updated");
    }

    return data;
  });

export const deleteWidget = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(widgets)
      .where(eq(widgets.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "Widget not deleted");
    }
  });
