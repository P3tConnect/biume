import { date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { Organization, organization } from "./organization";

export const task = pgTable("task", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  ownerId: text("ownerId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  description: text("description"),
  color: text("color"),
  location: text("location"),
  beginAt: date("beginAt"),
  endAt: date("endAt"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const taskRelations = relations(task, ({ one }) => ({
  owner: one(organization, {
    fields: [task.ownerId],
    references: [organization.id],
  }),
}));

export type Task = InferSelectModel<typeof task> & {
  owner: Organization;
};
export type CreateTask = typeof task.$inferInsert;

export const CreateTaskSchema = createInsertSchema(task);
