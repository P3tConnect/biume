import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { report } from "./report";
import { organization } from "./organization";

export const reportTemplate = pgTable("report_template", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  image: text("image").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => organization.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
});

export const reportTemplateRelations = relations(
  reportTemplate,
  ({ one, many }) => ({
    owner: one(organization, {
      fields: [reportTemplate.ownerId],
      references: [organization.id],
    }),
    reports: many(report),
  }),
);

export type ReportTemplate = typeof reportTemplate.$inferSelect;
export type ReportTemplateWithOwner = typeof reportTemplate.$inferSelect;

export const reporttemplateSchema = createSelectSchema(reportTemplate);
export const createReportTemplateSchema = createInsertSchema(reportTemplate);
