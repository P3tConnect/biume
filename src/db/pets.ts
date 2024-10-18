import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { proSession } from "./pro_session";
import { createInsertSchema } from "drizzle-zod";
import { petsDeseases } from "./petsDeseases";
import { z } from "zod";
import { petsAllergies } from "./petsAllergies";
import { petsIntolerences } from "./petsIntolerences";

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
  ownerId: text("ownerId").notNull(),
  nacType: text("nacType"),
  birthDate: timestamp("birthDate", { mode: "date" }).notNull(),
  furColor: text("furColor"),
  eyeColor: text("eyeColor"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const petsRelations = relations(pets, ({ one, many }) => ({
  sessions: many(proSession),
  deseases: many(petsDeseases),
  allergies: many(petsAllergies),
  intolerences: many(petsIntolerences),
}));

export type Pet = typeof pets.$inferSelect;
export type CreatePet = typeof pets.$inferInsert;
export const PetTypeEnum = z.enum(petType.enumValues);

export const CreatePetSchema = createInsertSchema(pets);
