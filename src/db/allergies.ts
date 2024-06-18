import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const allergies = pgTable("allergies", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title"),
    description: text("description"),
    createdAt: timestamp("createdAt", { mode: "date" })
        .default(new Date())
        .notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const allergiesRelations = relations(allergies, ({ one, many }) => ({}));

export type Allergy = typeof allergies.$inferSelect;
export type CreateAllergy = typeof allergies.$inferInsert;

export const CreateAllergySchema = createInsertSchema(allergies);
