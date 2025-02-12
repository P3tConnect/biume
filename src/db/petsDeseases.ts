import { pgTable, text } from "drizzle-orm/pg-core";
import { Pet, pets } from "./pets";
import { Desease, deseases } from "./deseases";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const petsDeseases = pgTable("pets_deseases", {
  petId: text("petId").references(() => pets.id, { onDelete: "cascade" }),
  deseaseId: text("deseaseId").references(() => deseases.id, {
    onDelete: "cascade",
  }),
});

export const petsDeseasesRelations = relations(petsDeseases, ({ one }) => ({
  pet: one(pets, {
    fields: [petsDeseases.petId],
    references: [pets.id],
  }),
  desease: one(deseases, {
    fields: [petsDeseases.deseaseId],
    references: [deseases.id],
  }),
}));

export type PetsDesease = InferSelectModel<typeof petsDeseases> & {
  pet: Pet;
  desease: Desease;
};
export type CreatePetsDesease = typeof petsDeseases.$inferInsert;

export const CreatePetsDeseaseSchema = createInsertSchema(petsDeseases);
