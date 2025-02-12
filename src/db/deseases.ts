import { pgTable, text } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { petsDeseases } from "./petsDeseases";
import { createInsertSchema } from "drizzle-zod";
import { User, user } from "./user";
import { Pet } from "./pets";

export const deseases = pgTable("deseases", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description").notNull(),
  ownerId: text("ownerId").references(() => user.id, {
    onDelete: "cascade",
  }),
});

export const deseasesRelations = relations(deseases, ({ one, many }) => ({
  pets: many(petsDeseases),
  owner: one(user, {
    fields: [deseases.ownerId],
    references: [user.id],
  }),
}));

export type Desease = InferSelectModel<typeof deseases> & {
  pets: Pet[];
  owner: User;
};
export type CreateDesease = typeof deseases.$inferInsert;

export const CreateDeseaseSchema = createInsertSchema(deseases);
