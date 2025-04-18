import { pgEnum, pgTable, text, integer, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { InferSelectModel, relations } from "drizzle-orm"
import { AnatomicalPart, anatomicalPart } from "../anatomicalPart"
import { AnatomicalPartType, anatomicalPartType } from "../anatomicalPartType"
import { AdvancedReport, advancedReport } from "./advancedReport"

// Définition des enums pour les types
export const anatomicalIssueType = pgEnum("anatomical_issue_type", [
  "dysfunction",
  "anatomicalSuspicion",
  "observation",
])
export const lateralityType = pgEnum("laterality_type", ["left", "right", "bilateral"])
export const anatomicalIssueObservationType = pgEnum("anatomical_issue_observation_type", ["dynamic", "static", "none"])

export const anatomicalIssue = pgTable("anatomical_issue", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  type: anatomicalIssueType("type").notNull().default("dysfunction"),
  observationType: anatomicalIssueObservationType("observation_type").default("none"),
  anatomicalPartId: text("anatomical_part_id")
    .notNull()
    .references(() => anatomicalPart.id, { onDelete: "cascade" }),
  anatomicalPartTypeId: text("anatomical_part_type_id")
    .notNull()
    .references(() => anatomicalPartType.id, { onDelete: "cascade" }),
  advancedReportId: text("advanced_report_id")
    .notNull()
    .references(() => advancedReport.id, { onDelete: "cascade" }),
  severity: integer("severity").notNull().default(2),
  notes: text("notes").default(""),
  laterality: lateralityType("laterality").notNull().default("bilateral"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
})

export const anatomicalIssueRelations = relations(anatomicalIssue, ({ one }) => ({
  anatomicalPart: one(anatomicalPart, {
    fields: [anatomicalIssue.anatomicalPartId],
    references: [anatomicalPart.id],
  }),
  anatomicalPartType: one(anatomicalPartType, {
    fields: [anatomicalIssue.anatomicalPartTypeId],
    references: [anatomicalPartType.id],
  }),
  advancedReport: one(advancedReport, {
    fields: [anatomicalIssue.advancedReportId],
    references: [advancedReport.id],
  }),
}))
// Types pour Typescript
export type AnatomicalIssue = InferSelectModel<typeof anatomicalIssue> & {
  anatomicalPart: AnatomicalPart
  anatomicalPartType: AnatomicalPartType
  advancedReport: AdvancedReport
}
export type NewAnatomicalIssue = typeof anatomicalIssue.$inferInsert

// Schemas pour validation avec Zod
export const AnatomicalIssueSchema = createSelectSchema(anatomicalIssue)
export const CreateAnatomicalIssueSchema = createInsertSchema(anatomicalIssue)
