import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { appointments } from "./appointments";
import { createInsertSchema } from "drizzle-zod";
import { petsDeseases } from "./petsDeseases";
import { z } from "zod";
import { petsAllergies } from "./petsAllergies";
import { petsIntolerences } from "./petsIntolerences";
import { user } from "./user";

export const petType = pgEnum("petType", [
  "Dog",
  "Cat",
  "Bird",
  "Horse",
  "NAC",
]);

export const pets = pgTable("pets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  type: petType("type").default("Dog").notNull(),
  weight: integer("weight"),
  height: integer("height"),
  description: text("description"),
  ownerId: text("ownerId").references(() => user.id, {
    onDelete: "cascade",
  }),
  nacType: text("nacType"),
  birthDate: timestamp("birthDate", { mode: "date" }).notNull(),
  furColor: text("furColor"),
  eyeColor: text("eyeColor"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const petsRelations = relations(pets, ({ one, many }) => ({
  appointments: many(appointments),
  deseases: many(petsDeseases),
  allergies: many(petsAllergies),
  intolerences: many(petsIntolerences),
  owner: one(user, {
    fields: [pets.ownerId],
    references: [user.id],
  }),
}));

export type Pet = InferSelectModel<typeof pets> & {
  owner: InferSelectModel<typeof user>;
  deseases: InferSelectModel<typeof petsDeseases>[];
  allergies: InferSelectModel<typeof petsAllergies>[];
  intolerences: InferSelectModel<typeof petsIntolerences>[];
};
export type CreatePet = typeof pets.$inferInsert;
export const PetTypeEnum = z.enum(petType.enumValues);

export const CreatePetSchema = createInsertSchema(pets);
