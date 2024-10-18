import { pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./user";
import { job } from "./job";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const usersJobs = pgTable("users_jobs", {
  userId: text("userId").primaryKey().notNull(),
  jobId: text("jobId").references(() => job.id, { onDelete: "cascade" }),
});

export const usersJobsRelations = relations(usersJobs, ({ one }) => ({
  job: one(job, {
    fields: [usersJobs.jobId],
    references: [job.id],
  }),
}));

export type UsersJobs = typeof usersJobs.$inferSelect;
export type CreateUsersJobs = typeof usersJobs.$inferInsert;

export const CreateUsersJobsSchema = createInsertSchema(usersJobs);
