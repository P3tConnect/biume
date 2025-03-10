import { InferSelectModel, relations } from "drizzle-orm"
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { Organization, organization } from "./organization"
import { User, user } from "./user"

export const reminderStatus = pgEnum("reminderStatus", ["pending", "completed", "cancelled"])

export const reminderType = pgEnum("reminderType", ["appointment", "followup", "vaccination", "medication", "other"])

export const reminder = pgTable("reminder", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  type: reminderType("type").default("other"),
  status: reminderStatus("status").default("pending"),
  dueDate: timestamp("dueDate", { mode: "date" }).notNull(),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  userId: text("userId").references(() => user.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const reminderRelations = relations(reminder, ({ one }) => ({
  organization: one(organization, {
    fields: [reminder.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [reminder.userId],
    references: [user.id],
  }),
}))

export type Reminder = InferSelectModel<typeof reminder> & {
  organization: Organization
  user: User
}
export type CreateReminder = typeof reminder.$inferInsert

export const ReminderSchema = createSelectSchema(reminder)
export const CreateReminderSchema = createInsertSchema(reminder)
