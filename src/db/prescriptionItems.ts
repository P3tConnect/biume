import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { Prescription, prescription } from "./prescription"
import { InferSelectModel, relations } from "drizzle-orm"
import { createSelectSchema, createInsertSchema } from "drizzle-zod"

export const prescriptionItems = pgTable("prescriptionItems", {
  id: text("id").primaryKey(),
  prescriptionId: text("prescriptionId").references(() => prescription.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  dosage: text("dosage").notNull(),
  frequency: text("frequency").notNull(),
  duration: text("duration").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const prescriptionItemsRelations = relations(prescriptionItems, ({ one }) => ({
  prescription: one(prescription, {
    fields: [prescriptionItems.prescriptionId],
    references: [prescription.id],
  }),
}))

export const prescriptionItemsSchema = createSelectSchema(prescriptionItems)
export const createPrescriptionItemsSchema = createInsertSchema(prescriptionItems)

export type PrescriptionItem = InferSelectModel<typeof prescriptionItems> & {
  prescription: Prescription
}
export type CreatePrescriptionItem = typeof prescriptionItems.$inferInsert
