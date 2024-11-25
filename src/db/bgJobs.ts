import { date, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { organization } from "./organization";

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
  from: text("from").references(() => organization.id, {
    onDelete: "cascade",
  }),
  to: text("to").notNull(),
  dateToExecute: date("dateToExecute"),
  status: bgJobsStatus("status").default("pending"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const jobsRelations = relations(bgJobs, ({ one }) => ({
  organization: one(organization, {
    fields: [bgJobs.from],
    references: [organization.id],
  }),
}));

export type BgJobs = typeof bgJobs.$inferSelect;
export type BgJobsInsert = typeof bgJobs.$inferInsert;

export const bgJobsTypeEnum = z.enum(bgJobsType.enumValues);
export const bgJobsStatusEnum = z.enum(bgJobsStatus.enumValues);

export const SelectBgJobsSchema = createSelectSchema(bgJobs);
export const CreateBgJobsSchema = createInsertSchema(bgJobs);
