import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { user } from "./user";

export const allergies = pgTable("allergies", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title"),
  description: text("description"),
  ownerId: text("ownerId").references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const allergiesRelations = relations(allergies, ({ one, many }) => ({
  owner: one(user, {
    fields: [allergies.ownerId],
    references: [user.id],
  }),
}));

export type Allergy = typeof allergies.$inferSelect;
export type CreateAllergy = typeof allergies.$inferInsert;

export const CreateAllergySchema = createInsertSchema(allergies);
