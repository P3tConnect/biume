import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { company } from "./company";

export const widgetsType = pgEnum("widgetsType", ["Square", "Rectangle"]);

export const widgetsOrientation = pgEnum("widgetsOrientation", [
  "Horizontal",
  "Vertical",
]);

export const widgets = pgTable("widgets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  type: widgetsType("type").default("Square").notNull(),
  orientation: widgetsOrientation("type").default("Horizontal").notNull(),
  companyId: text("companyId").references(() => company.id, {
    onDelete: "cascade",
  }),
});

export const widgetsRelations = relations(widgets, ({ one, many }) => ({
  company: one(company, {
    fields: [widgets.companyId],
    references: [company.id],
  }),
}));

export type Widget = typeof widgets.$inferSelect;

export type CreateWidget = typeof widgets.$inferInsert;
export const WidgetsType = z.enum(widgetsType.enumValues);
export const WidgetsOrientation = z.enum(widgetsOrientation.enumValues);

export const CreateWidgetsSchema = createInsertSchema(widgets);
