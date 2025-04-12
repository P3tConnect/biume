import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { anatomicalRegion, sideType } from "./anatomicalRegion";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const anatomicalRegionPath = pgTable("anatomical_region_path", {
  id: text("id").$defaultFn(() => crypto.randomUUID()).primaryKey(),
  regionId: text("region_id").notNull().references(() => anatomicalRegion.id, { 
    onDelete: "cascade" 
  }),
  side: sideType("side").notNull(),
  path: text("path").notNull(),
  viewBox: text("view_box").notNull(),
  organizationId: text("organization_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type AnatomicalRegionPath = typeof anatomicalRegionPath.$inferSelect;
export type NewAnatomicalRegionPath = typeof anatomicalRegionPath.$inferInsert;

export const AnatomicalRegionPathSchema = createSelectSchema(anatomicalRegionPath);
export const CreateAnatomicalRegionPathSchema = createInsertSchema(anatomicalRegionPath);