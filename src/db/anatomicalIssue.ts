import { pgEnum, pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { dysfunction } from "./dysfunction";
import { dysfunctionType } from "./dysfunctionType";
import { report } from "./report";
import { relations } from "drizzle-orm";

// Définition des enums pour les types
export const anatomicalIssueType = pgEnum("anatomical_issue_type", ["dysfunction", "anatomicalSuspicion"]);
export const lateralityType = pgEnum("laterality_type", ["left", "right", "bilateral"]);

export const anatomicalIssue = pgTable("anatomical_issue", {
  id: text("id").$defaultFn(() => crypto.randomUUID()).primaryKey(),
  dysfunctionId: text("dysfunction_id").notNull().references(() => dysfunction.id, { onDelete: "cascade" }),
  dysfunctionTypeId: text("dysfunction_type_id").notNull().references(() => dysfunctionType.id, { onDelete: "cascade" }),
  reportId: text("report_id").notNull().references(() => report.id, { onDelete: "cascade" }),
  severity: integer("severity").notNull().default(2),
  notes: text("notes").default(""),
  laterality: lateralityType("laterality").notNull().default("bilateral"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const anatomicalIssueRelations = relations(anatomicalIssue, ({ one }) => ({
  dysfunction: one(dysfunction, {
    fields: [anatomicalIssue.dysfunctionId],
    references: [dysfunction.id],
  }),
  dysfunctionType: one(dysfunctionType, {
    fields: [anatomicalIssue.dysfunctionTypeId],
    references: [dysfunctionType.id],
  }),
  report: one(report, {
    fields: [anatomicalIssue.reportId],
    references: [report.id],
  }),
}));
// Types pour Typescript
export type AnatomicalIssue = typeof anatomicalIssue.$inferSelect;
export type NewAnatomicalIssue = typeof anatomicalIssue.$inferInsert;

// Schemas pour validation avec Zod
export const AnatomicalIssueSchema = createSelectSchema(anatomicalIssue);
export const CreateAnatomicalIssueSchema = createInsertSchema(anatomicalIssue);
