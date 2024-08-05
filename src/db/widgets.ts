import { integer, pgEnum, pgTable } from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";

export const widgetsType = pgEnum("widgetsType", [
  "Square",
  "Rectangle"
]);

export const widgetsOrientation = pgEnum("widgetsOrientation", [
  "Horizontal",
  "Vertical"
]);

export const widgets = pgTable("widgets", {
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  type: widgetsType("type").default("Square").notNull(),
  orientation: widgetsOrientation("type").default("Horizontal").notNull(),
});

export type Widget = typeof widgets.$inferSelect;

export type CreateWidget = typeof widgets.$inferInsert;

export const CreateWidgetsSchema = createInsertSchema(widgets);
