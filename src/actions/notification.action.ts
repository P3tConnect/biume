import { z } from "zod";
import { action, db } from "../lib";
import { CreateNotificationSchema, notification } from "../db";
import { ZSAError } from "zsa";
import { eq } from "drizzle-orm";

export const getNotifications = async () => {
  const data = await db.query.notification.findMany().execute();

  if (!data) {
    throw new Error("Notifications not found");
  }

  return data;
};

export const createNotification = action.input(CreateNotificationSchema).handler(async ({ input }) => {
  const data = await db.insert(notification).values(input).returning().execute();

  if (!data) {
    throw new ZSAError("ERROR", "Notification not created");
  }

  return data;
});

export const updateNotification = action.input(CreateNotificationSchema).handler(async ({ input }) => {
  const data = await db
    .update(notification)
    .set(input)
    .where(eq(notification.id, input.id as string))
    .returning()
    .execute();

  if (!data) {
    throw new ZSAError("ERROR", "Notification not updated");
  }

  return data;
});

export const deleteNotification = action.input(z.string()).handler(async ({ input }) => {
  const data = await db
    .delete(notification)
    .where(eq(notification.id, input))
    .returning()
    .execute();

  if (!data) {
    throw new ZSAError("ERROR", "Notification not deleted");
  }
})