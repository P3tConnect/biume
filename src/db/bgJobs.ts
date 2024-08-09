import { date, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const bgJobsStatus = pgEnum("jobStatus", [
  "pending",
  "in_progress",
  "completed",
  "failed",
]);

export const bgJobsType = pgEnum("jobType", [
  "reminder",
  "newsletter",
  "payout",
  "refund",
  "none",
]);

export const bgJobs = pgTable("bg_jobs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  jobType: bgJobsType("jobType").default("none"),
  from: text("from").references(() => company.id, {
    onDelete: "cascade",
  }),
  to: text("to").references(() => user.id, {
    onDelete: "cascade",
  }),
  dateToExecute: date("dateToExecute"),
  status: bgJobsStatus("status").default("pending"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const jobsRelations = relations(bgJobs, ({ one }) => ({
  company: one(company, {
    fields: [bgJobs.from],
    references: [company.id],
  }),
  user: one(user, {
    fields: [bgJobs.to],
    references: [user.id],
  }),
}));

export type BgJobs = typeof bgJobs.$inferSelect;
export type BgJobsInsert = typeof bgJobs.$inferInsert;

export const bgJobsTypeEnum = z.enum(bgJobsType.enumValues);
export const bgJobsStatusEnum = z.enum(bgJobsStatus.enumValues);

export const SelectBgJobsSchema = createSelectSchema(bgJobs);
export const CreateBgJobsSchema = createInsertSchema(bgJobs);
