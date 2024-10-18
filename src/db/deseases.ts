import { pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { petsDeseases } from "./petsDeseases";
import { createInsertSchema } from "drizzle-zod";

export const deseases = pgTable("deseases", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description").notNull(),
  ownerId: text("ownerId").primaryKey().notNull(),
});

export const deseasesRelations = relations(deseases, ({ one, many }) => ({
  pets: many(petsDeseases),
}));

export type Desease = typeof deseases.$inferSelect;
export type CreateDesease = typeof deseases.$inferInsert;

export const CreateDeseaseSchema = createInsertSchema(deseases);
