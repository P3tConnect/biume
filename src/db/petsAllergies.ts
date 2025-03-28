import { pgTable, text } from "drizzle-orm/pg-core";
import { Pet, pets } from "./pets";
import { InferSelectModel, relations } from "drizzle-orm";
import { allergies, Allergy } from "./allergies";
import { createInsertSchema } from "drizzle-zod";

export const petsAllergies = pgTable("pets_allergies", {
  petId: text("petId").references(() => pets.id, { onDelete: "cascade" }),
  allergyId: text("allergyId").references(() => allergies.id, {
    onDelete: "cascade",
  }),
});

export const petsAllergiesRelations = relations(petsAllergies, ({ one }) => ({
  pet: one(pets, {
    fields: [petsAllergies.petId],
    references: [pets.id],
  }),
  allergy: one(allergies, {
    fields: [petsAllergies.allergyId],
    references: [allergies.id],
  }),
}));

export type PetsAllergy = InferSelectModel<typeof petsAllergies> & {
  pet: Pet;
  allergy: Allergy;
};
export type CreatePetsAllergy = typeof petsAllergies.$inferInsert;

export const CreatePetsAllergySchema = createInsertSchema(petsAllergies);
