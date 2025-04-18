import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { SimpleReport, simpleReport } from "./simpleReport"
import { lateralityType } from "../advancedReport/anatomicalIssue"
import { InferSelectModel, relations } from "drizzle-orm"

export const simpleReportItemsType = pgEnum("simpleReportItemsType", [
  "observation",
  "intervention",
  "recommendation",
  "other",
])

export const simpleReportItems = pgTable("simpleReportItems", {
  id: text("id").primaryKey(),
  simpleReportId: text("simpleReportId").references(() => simpleReport.id),
  type: simpleReportItemsType("type").notNull().default("observation"),
  severity: integer("severity").notNull().default(2),
  notes: text("notes").default(""),
  laterality: lateralityType("laterality").notNull().default("bilateral"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt"),
})

export const simpleReportItemsRelations = relations(simpleReportItems, ({ one }) => ({
  simpleReport: one(simpleReport, {
    fields: [simpleReportItems.simpleReportId],
    references: [simpleReport.id],
  }),
}))

export type SimpleReportItem = InferSelectModel<typeof simpleReportItems> & {
  simpleReport: SimpleReport
}
export type CreateSimpleReportItem = typeof simpleReportItems.$inferInsert
