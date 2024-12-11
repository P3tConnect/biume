import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { usersJobs } from "./usersJobs";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const job = pgTable("job", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

export const jobRelations = relations(job, ({ many }) => ({
  users: many(usersJobs),
}));

export type ProJob = typeof job.$inferSelect;
export type CreateProJob = typeof job.$inferInsert;

export const SelectJobSchema = createSelectSchema(job);
export const CreateJobSchema = createInsertSchema(job);
