import { InferSelectModel, relations } from "drizzle-orm"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { Organization, organization } from "../organization"
import { SimpleReportItem, simpleReportItems } from "./simpleReportItems"
import { Appointment, appointments } from "../appointments"

export const simpleReport = pgTable("simpleReport", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdBy: text("createdBy").references(() => organization.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

export const simpleReportRelations = relations(simpleReport, ({ one, many }) => ({
  organization: one(organization, {
    fields: [simpleReport.createdBy],
    references: [organization.id],
  }),
  appointment: one(appointments),
  simpleReportItems: many(simpleReportItems),
}))

export type SimpleReport = InferSelectModel<typeof simpleReport> & {
  organization: Organization
  appointment: Appointment
  simpleReportItems: SimpleReportItem[]
}
export type CreateSimpleReport = typeof simpleReport.$inferInsert
