import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { appointments } from "./appointments";
import { createInsertSchema } from "drizzle-zod";
import { petsDeseases } from "./petsDeseases";
import { z } from "zod";
import { petsAllergies } from "./petsAllergies";
import { petsIntolerences } from "./petsIntolerences";
import { User, user } from "./user";
import { Allergy } from "./allergies";
import { Intolerence } from "./intolerences";
import { Desease } from "./deseases";

export const petType = pgEnum("petType", [
  "Dog",
  "Cat",
  "Bird",
  "Horse",
  "NAC",
]);

export const petGender = pgEnum("petGender", ["Male", "Female"]);

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
  breed: text("breed"),
  image: text("image"),
  gender: petGender("gender").notNull().default("Male"),
  nacType: text("nacType"),
  birthDate: timestamp("birthDate", { mode: "date" }).notNull(),
  intolerences: text("intolerences").array(),
  deseases: text("deseases").array(),
  allergies: text("allergies").array(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
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
  owner: User;
  deseases: Desease[];
  allergies: Allergy[];
  intolerences: Intolerence[];
};
export type CreatePet = typeof pets.$inferInsert;
export const PetTypeEnum = z.enum(petType.enumValues);

export const CreatePetSchema = createInsertSchema(pets);
