import { z } from "zod";
import { db, ownerAction, ActionError } from "../lib";
import { CreateReminderSchema, reminder } from "../db/reminder";
import { eq } from "drizzle-orm";

export const updateReminder = ownerAction
  .schema(CreateReminderSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(reminder)
      .set(parsedInput)
      .where(eq(reminder.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Reminder not updated");
    }

    return data;
  });

export const deleteReminder = ownerAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(reminder)
      .where(eq(reminder.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Reminder not deleted");
    }

    return data;
  });
