import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { Pet, pets } from "./pets"
import { InferSelectModel, relations } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const petDocuments = pgTable("pet_documents", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  petId: text("pet_id").references(() => pets.id),
  title: text("title").notNull(),
  documentType: text("documentType").notNull(),
  documentUrl: text("documentUrl").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt"),
})

export const petDocumentsRelations = relations(petDocuments, ({ one }) => ({
  pet: one(pets, {
    fields: [petDocuments.petId],
    references: [pets.id],
  }),
}))

export type PetDocument = InferSelectModel<typeof petDocuments> & {
  pet: Pet
}
export type NewPetDocument = typeof petDocuments.$inferInsert

export const petDocumentsInsertSchema = createInsertSchema(petDocuments)
export const petDocumentsSelectSchema = createSelectSchema(petDocuments)
