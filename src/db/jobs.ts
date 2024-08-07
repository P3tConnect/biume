import { date, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const JobStatus = pgEnum("jobStatus", [
  "pending",
  "in_progress",
  "completed",
  "failed",
]);

export const JobType = pgEnum("jobType", [
  "reminder",
  "newsletter",
  "payout",
  "none",
]);

export const jobs = pgTable("jobs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  jobType: JobType("jobType").default("none"),
  from: text("from").references(() => company.id, {
    onDelete: "cascade",
  }),
  to: text("to").references(() => user.id, {
    onDelete: "cascade",
  }),
  dateToExecute: date("dateToExecute"),
  status: JobStatus("status").default("pending"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const jobsRelations = relations(jobs, ({ one }) => ({
  company: one(company, {
    fields: [jobs.from],
    references: [company.id],
  }),
  user: one(user, {
    fields: [jobs.to],
    references: [user.id],
  }),
}));

export type Job = typeof jobs.$inferSelect;
export type JobInsert = typeof jobs.$inferInsert;

export const jobTypeEnum = z.enum(JobType.enumValues);
export const jobStatusEnum = z.enum(JobStatus.enumValues);

export const SelectJobSchema = createSelectSchema(jobs);
export const CreateJobSchema = createInsertSchema(jobs);
