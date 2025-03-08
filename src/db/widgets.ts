import { InferSelectModel, relations } from "drizzle-orm"
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import { Organization, organization } from "./organization"

export const widgetsType = pgEnum("widgetsType", ["Square", "Rectangle"])

export const widgetsOrientation = pgEnum("widgetsOrientation", ["Horizontal", "Vertical"])

export const widgets = pgTable("widgets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  type: widgetsType("type").default("Square").notNull(),
  orientation: widgetsOrientation("type").default("Horizontal").notNull(),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
})

export const widgetsRelations = relations(widgets, ({ one, many }) => ({
  company: one(organization, {
    fields: [widgets.organizationId],
    references: [organization.id],
  }),
}))

export type Widget = InferSelectModel<typeof widgets> & {
  company: Organization
}

export type CreateWidget = typeof widgets.$inferInsert
export const WidgetsType = z.enum(widgetsType.enumValues)
export const WidgetsOrientation = z.enum(widgetsOrientation.enumValues)

export const WidgetsSchema = createSelectSchema(widgets)
export const CreateWidgetsSchema = createInsertSchema(widgets)
