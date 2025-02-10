import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./user";

export const notificationType = pgEnum("notificationType", [
  "rate",
  "newClient",
  "newReport",
  "newAskReservation",
]);

export const notification = pgTable("notification", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  notificationType: text("notificationType").notNull(),
  message: text("message").notNull(),
  userId: text("userId").references(() => user.id, {
    onDelete: "cascade",
  }),
  new: boolean("new").default(true),
  createdAt: text("createdAt").notNull(),
  updatedAt: text("updatedAt").notNull(),
});

export const notificationRelations = relations(notification, ({ one }) => ({
  user: one(user, {
    fields: [notification.userId],
    references: [user.id],
  }),
}));

export type Notification = InferSelectModel<typeof notification> & {
  user: InferSelectModel<typeof user>;
};
export type CreateNotification = typeof notification.$inferInsert;

export const CreateNotificationSchema = createInsertSchema(notification);
export const SelectNotificationSchema = createSelectSchema(notification);
