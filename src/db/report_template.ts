import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const reportTemplate = pgTable("report_template", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reportTemplateRelations = relations(reportTemplate, ({ one }) => ({
  owner: one(user, {
    fields: [reportTemplate.ownerId],
    references: [user.id],
  }),
}));

export type ReportTemplate = typeof reportTemplate.$inferSelect;
export type ReportTemplateWithOwner = typeof reportTemplate.$inferSelect;

export const reportTemplateSchema = createInsertSchema(reportTemplate);
