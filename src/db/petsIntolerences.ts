import { pgTable, text } from "drizzle-orm/pg-core";
import { Pet, pets } from "./pets";
import { InferSelectModel, relations } from "drizzle-orm";
import { Intolerence, intolerences } from "./intolerences";
import { createInsertSchema } from "drizzle-zod";

export const petsIntolerences = pgTable("pets_intolerences", {
  petId: text("petId").references(() => pets.id, { onDelete: "cascade" }),
  intolerenceId: text("intolerenceId").references(() => intolerences.id, {
    onDelete: "cascade",
  }),
});

export const petsIntolerencesRelations = relations(
  petsIntolerences,
  ({ one }) => ({
    pet: one(pets, {
      fields: [petsIntolerences.petId],
      references: [pets.id],
    }),
    intolerence: one(intolerences, {
      fields: [petsIntolerences.intolerenceId],
      references: [intolerences.id],
    }),
  }),
);

export type PetsIntolerence = InferSelectModel<typeof petsIntolerences> & {
  pet: Pet;
  intolerence: Intolerence;
};
export type CreatePetsIntolerence = typeof petsIntolerences.$inferInsert;

export const CreatePetsIntolerenceSchema = createInsertSchema(petsIntolerences);
