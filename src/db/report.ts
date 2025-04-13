import { InferSelectModel, relations } from "drizzle-orm"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { Appointment, appointments } from "./appointments"
import { AnatomicalIssue, anatomicalIssue } from "./anatomicalIssue"
import { organization } from "./organization"

export const report = pgTable("report", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdBy: text("createdBy").references(() => organization.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const reportRelations = relations(report, ({ one, many }) => ({
  appointments: one(appointments),
  anatomicalIssues: many(anatomicalIssue),
}))

export type Report = InferSelectModel<typeof report> & {
  appointments: Appointment
  anatomicalIssues: AnatomicalIssue[]
}
export type CreateReport = typeof report.$inferInsert

export const CreateReportSchema = createInsertSchema(report)
export const ReportSchema = createSelectSchema(report)