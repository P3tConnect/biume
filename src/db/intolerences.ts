import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { petsIntolerences } from "./petsIntolerences";
import { User, user } from "./user";
import { Pet } from "./pets";

export const intolerences = pgTable("intolerences", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title"),
  description: text("description"),
  ownerId: text("ownerId").references(() => user.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const intolerencesRelations = relations(
  intolerences,
  ({ one, many }) => ({
    pets: many(petsIntolerences),
    owner: one(user, {
      fields: [intolerences.ownerId],
      references: [user.id],
    }),
  }),
);

export type Intolerence = InferSelectModel<typeof intolerences> & {
  owner: User;
  pets: Pet[];
};
export type CreateIntolerence = typeof intolerences.$inferInsert;

export const CreateIntolerenceSchema = createInsertSchema(intolerences);
