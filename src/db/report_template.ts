import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { report } from "./report";
import { company } from "./company";

export const reportTemplate = pgTable("report_template", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  image: text("image").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => company.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
});

export const reportTemplateRelations = relations(
  reportTemplate,
  ({ one, many }) => ({
    owner: one(company, {
      fields: [reportTemplate.ownerId],
      references: [company.id],
    }),
    reports: many(report),
  }),
);

export type ReportTemplate = typeof reportTemplate.$inferSelect;
export type ReportTemplateWithOwner = typeof reportTemplate.$inferSelect;

export const reportTemplateSchema = createInsertSchema(reportTemplate);
