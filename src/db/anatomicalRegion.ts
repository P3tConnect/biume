import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const sideType = pgEnum("side_type", ["left", "right"]);

export const anatomicalRegion = pgTable("anatomical_region", {
  id: text("id").$defaultFn(() => crypto.randomUUID()).primaryKey(),
  key: text("key").notNull().unique(),
  label: text("label").notNull(),
  category: text("category"),
  organizationId: text("organization_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type AnatomicalRegion = typeof anatomicalRegion.$inferSelect;
export type NewAnatomicalRegion = typeof anatomicalRegion.$inferInsert;

export const AnatomicalRegionSchema = createSelectSchema(anatomicalRegion);
export const CreateAnatomicalRegionSchema = createInsertSchema(anatomicalRegion);