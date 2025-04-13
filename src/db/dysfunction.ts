import { InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { AnatomicalIssue, anatomicalIssue } from "./anatomicalIssue";
import { DysfunctionType, dysfunctionType } from "./dysfunctionType";

export const dysfunctionZone = pgEnum("dysfunction_zone", ["articulation", "fascias", "organes", "muscles", "other"]);
export const animalType = pgEnum("animal_type", ["DOG", "CAT"]);

export const dysfunction = pgTable("dysfunction", {
  id: text("id").$defaultFn(() => crypto.randomUUID()).primaryKey(),
  zone: dysfunctionZone("zone").notNull(),
  name: text("name").notNull().default(""),
  viewboxLeft: text("viewboxLeft").notNull().default(""),
  pathLeft: text("pathLeft").notNull().default(""),
  viewboxRight: text("viewboxRight").notNull().default(""),
  pathRight: text("pathRight").notNull().default(""),
  animalType: animalType("animal_type").notNull().default("DOG"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const dysfunctionsRelations = relations(dysfunction, ({ many }) => ({
  anatomicalIssues: many(anatomicalIssue),
  dysfunctionType: many(dysfunctionType),
}));

export type Dysfunction = InferSelectModel<typeof dysfunction> & {
  anatomicalIssues: AnatomicalIssue[];
  dysfunctionType: DysfunctionType[];
};
export type DysfunctionInsert = typeof dysfunction.$inferInsert;

export const dysfunctionInsertSchema = createInsertSchema(dysfunction);
export const dysfunctionSelectSchema = createSelectSchema(dysfunction);