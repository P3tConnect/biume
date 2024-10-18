import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { createInsertSchema } from "drizzle-zod";
import { petsIntolerences } from "./petsIntolerences";

export const intolerences = pgTable("intolerences", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title"),
  description: text("description"),
  ownerId: text("ownerId").primaryKey().notNull(),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const intolerencesRelations = relations(
  intolerences,
  ({ one, many }) => ({
    pets: many(petsIntolerences),
  }),
);

export type Intolerence = typeof intolerences.$inferSelect;
export type CreateIntolerence = typeof intolerences.$inferInsert;

export const CreateIntolerenceSchema = createInsertSchema(intolerences);
