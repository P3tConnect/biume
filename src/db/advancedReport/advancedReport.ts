import { relations } from "drizzle-orm"
import { InferSelectModel } from "drizzle-orm"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { Organization, organization } from "../organization"
import { AnatomicalIssue, anatomicalIssue } from "./anatomicalIssue"
import { advancedReportRecommendations } from "./advancedReportRecommantations"

export const advancedReport = pgTable("advancedReport", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdBy: text("createdBy").references(() => organization.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const advancedReportRelations = relations(advancedReport, ({ one, many }) => ({
  organization: one(organization, {
    fields: [advancedReport.createdBy],
    references: [organization.id],
  }),
  anatomicalIssues: many(anatomicalIssue),
  recommendations: many(advancedReportRecommendations),
}))

export type AdvancedReport = InferSelectModel<typeof advancedReport> & {
  organization: Organization
  anatomicalIssues: AnatomicalIssue[]
}
export type CreateAdvancedReport = typeof advancedReport.$inferInsert
