import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { Organization, organization } from "./organization"
import { InferSelectModel, relations } from "drizzle-orm"
import { appointments } from "./appointments"
import { PrescriptionItem, prescriptionItems } from "./prescriptionItems"
import { createInsertSchema } from "drizzle-zod"
import { createSelectSchema } from "drizzle-zod"

export const prescription = pgTable("prescription", {
  id: text("id").primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdBy: text("createdBy").references(() => organization.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const prescriptionRelations = relations(prescription, ({ one, many }) => ({
  createdBy: one(organization),
  appointment: one(appointments),
  items: many(prescriptionItems),
}))

export const prescriptionSchema = createSelectSchema(prescription)
export const createPrescriptionSchema = createInsertSchema(prescription)

export type Prescription = InferSelectModel<typeof prescription> & {
  items: PrescriptionItem[]
  createdBy: Organization
}
export type CreatePrescription = typeof prescription.$inferInsert
