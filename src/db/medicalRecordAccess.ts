import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { pets } from "./pets";
import { organization } from "./organization";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { createSelectSchema } from "drizzle-zod";

export const medicalRecordAccess = pgTable("medical_record_access", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  patientId: text("patientId").references(() => pets.id, { onDelete: "cascade" }),
  proId: text("proId").references(() => organization.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const medicalRecordAccessRelations = relations(medicalRecordAccess, ({ one }) => ({
  patient: one(pets, {
    fields: [medicalRecordAccess.patientId],
    references: [pets.id],
  }),
  pro: one(organization, {
    fields: [medicalRecordAccess.proId],
    references: [organization.id],
  }),
}));

export type MedicalRecordAccess = typeof medicalRecordAccess.$inferSelect
export type CreateMedicalRecordAccess = typeof medicalRecordAccess.$inferInsert

export const medicalRecordAccessInsertSchema = createInsertSchema(medicalRecordAccess)
export const medicalRecordAccessSelectSchema = createSelectSchema(medicalRecordAccess)