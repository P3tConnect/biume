import { date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { relations } from "drizzle-orm";

export const task = pgTable("task", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  ownerId: text("ownerId").references(() => company.id, {
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
  owner: one(company, {
    fields: [task.ownerId],
    references: [company.id],
  }),
}));

export type Task = typeof task.$inferSelect;
export type CreateTask = typeof task.$inferInsert;
