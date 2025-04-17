import { InferSelectModel, relations } from "drizzle-orm"
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { anatomicalPart, AnatomicalPart } from "./anatomicalPart"

export const anatomicalPartType = pgTable("anatomical_part_type", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  name: text("name").notNull().default(""),
  precision: boolean("precision").notNull().default(false),
  anatomicalPartId: text("anatomical_part_id")
    .notNull()
    .references(() => anatomicalPart.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
})

export const anatomicalPartTypeRelations = relations(anatomicalPartType, ({ one }) => ({
  anatomicalPart: one(anatomicalPart, {
    fields: [anatomicalPartType.anatomicalPartId],
    references: [anatomicalPart.id],
  }),
}))

export const anatomicalPartTypeInsertSchema = createInsertSchema(anatomicalPartType)
export const anatomicalPartTypeSelectSchema = createSelectSchema(anatomicalPartType)

export type AnatomicalPartType = InferSelectModel<typeof anatomicalPartType> & {
  anatomicalPart: AnatomicalPart
}
export type AnatomicalPartTypeInsert = typeof anatomicalPartType.$inferInsert
