import { z } from "zod";
import { authedAction, db, ActionError } from "../lib";
import { CreateNotificationSchema, notification } from "../db";
import { eq } from "drizzle-orm";

export const getNotifications = async () => {
  const data = await db.query.notification.findMany().execute();

  if (!data) {
    throw new ActionError("Notifications not found");
  }

  return data;
};

export const createNotification = authedAction
  .schema(CreateNotificationSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .insert(notification)
      .values(parsedInput)
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Notification not created");
    }

    return data;
  });

export const updateNotification = authedAction
  .schema(CreateNotificationSchema)
  .action(async ({ parsedInput }) => {
    const data = await db
      .update(notification)
      .set(parsedInput)
      .where(eq(notification.id, parsedInput.id as string))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Notification not updated");
    }

    return data;
  });

export const deleteNotification = authedAction
  .schema(z.string())
  .action(async ({ parsedInput }) => {
    const data = await db
      .delete(notification)
      .where(eq(notification.id, parsedInput))
      .returning()
      .execute();

    if (!data) {
      throw new ActionError("Notification not deleted");
    }
  });
