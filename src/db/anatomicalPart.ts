import { InferSelectModel, relations } from "drizzle-orm"
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { AnatomicalIssue, anatomicalIssue } from "./advancedReport/anatomicalIssue"
import { AnatomicalPartType, anatomicalPartType } from "./anatomicalPartType"

export const dysfunctionZone = pgEnum("dysfunction_zone", ["articulation", "fascias", "organes", "muscles", "other"])
export const animalType = pgEnum("animal_type", ["DOG", "CAT"])

export const anatomicalPart = pgTable("anatomical_part", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  zone: dysfunctionZone("zone").notNull(),
  name: text("name").notNull().default(""),
  viewboxLeft: text("viewboxLeft").notNull().default(""),
  pathLeft: text("pathLeft").notNull().default(""),
  transformLeft: text("transformLeft").notNull().default(""),
  viewboxRight: text("viewboxRight").notNull().default(""),
  pathRight: text("pathRight").notNull().default(""),
  transformRight: text("transformRight").notNull().default(""),
  animalType: animalType("animal_type").notNull().default("DOG"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
})

export const anatomicalPartsRelations = relations(anatomicalPart, ({ many }) => ({
  anatomicalIssues: many(anatomicalIssue),
  anatomicalPartTypes: many(anatomicalPartType),
}))

export type AnatomicalPart = InferSelectModel<typeof anatomicalPart> & {
  anatomicalIssues: AnatomicalIssue[]
  anatomicalPartTypes: AnatomicalPartType[]
}
export type AnatomicalPartInsert = typeof anatomicalPart.$inferInsert

export const anatomicalPartInsertSchema = createInsertSchema(anatomicalPart)
export const anatomicalPartSelectSchema = createSelectSchema(anatomicalPart)
