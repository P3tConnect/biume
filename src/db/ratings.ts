import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { organization } from "./organization";

export const ratings = pgTable("ratings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  rate: integer("rate").notNull(),
  comment: text("comment"),
  proId: text("proId").references(() => organization.id, { onDelete: "cascade" }),
  writerId: text("writerId").notNull(),
  isRecommanded: boolean("isRecommanded").default(false).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const ratingsRelations = relations(ratings, ({ one }) => ({
  for: one(organization, {
    fields: [ratings.proId],
    references: [organization.id],
  }),
}));

export type Rating = typeof ratings.$inferSelect;
export type CreateRating = typeof ratings.$inferInsert;

export const CreateRatingSchema = createInsertSchema(ratings);
