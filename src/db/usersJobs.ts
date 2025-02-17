import { pgTable, text } from "drizzle-orm/pg-core";
import { Job, job } from "./job";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { User, user } from "./user";

export const usersJobs = pgTable("users_jobs", {
  userId: text("userId").references(() => user.id, { onDelete: "cascade" }),
  jobId: text("jobId").references(() => job.id, { onDelete: "cascade" }),
});

export const usersJobsRelations = relations(usersJobs, ({ one }) => ({
  job: one(job, {
    fields: [usersJobs.jobId],
    references: [job.id],
  }),
  user: one(user, {
    fields: [usersJobs.userId],
    references: [user.id],
  }),
}));

export type UsersJobs = InferSelectModel<typeof usersJobs> & {
  job: Job;
  user: User;
};
export type CreateUsersJobs = typeof usersJobs.$inferInsert;

export const CreateUsersJobsSchema = createInsertSchema(usersJobs);
