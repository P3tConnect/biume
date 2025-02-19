import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { petsAllergies } from "./petsAllergies";
import { User, user } from "./user";
import { Pet } from "./pets";

export const allergies = pgTable("allergies", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title"),
  description: text("description"),
  ownerId: text("ownerId").references(() => user.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const allergiesRelations = relations(allergies, ({ one, many }) => ({
  pets: many(petsAllergies),
  owner: one(user, {
    fields: [allergies.ownerId],
    references: [user.id],
  }),
}));

export type Allergy = InferSelectModel<typeof allergies> & {
  pets: Pet[];
  owner: User;
};
export type CreateAllergy = typeof allergies.$inferInsert;

export const CreateAllergySchema = createInsertSchema(allergies);
