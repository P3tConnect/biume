import { pgEnum, pgTable, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Définition des enums pour les types
export const anatomicalIssueType = pgEnum("anatomical_issue_type", ["dysfunction", "anatomicalSuspicion"]);
export const lateralityType = pgEnum("laterality_type", ["left", "right", "bilateral"]);

export const anatomicalIssue = pgTable("anatomical_issue", {
  id: text("id").$defaultFn(() => crypto.randomUUID()).primaryKey(),
  name: text("name").notNull(),
  region: text("region").notNull(),
  type: anatomicalIssueType("type").notNull().default("dysfunction"),
  severity: integer("severity").notNull().default(2),
  notes: text("notes").default(""),
  interventionZone: text("intervention_zone"),
  laterality: lateralityType("laterality").notNull().default("bilateral"),
  organizationId: text("organization_id"),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

// Types pour Typescript
export type AnatomicalIssue = typeof anatomicalIssue.$inferSelect;
export type NewAnatomicalIssue = typeof anatomicalIssue.$inferInsert;

// Schemas pour validation avec Zod
export const AnatomicalIssueSchema = createSelectSchema(anatomicalIssue);
export const CreateAnatomicalIssueSchema = createInsertSchema(anatomicalIssue);
