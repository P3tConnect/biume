import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { organization } from "./organization";
import { user } from "./user";

export const ratings = pgTable("ratings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  rate: integer("rate").notNull().default(0),
  comment: text("comment"),
  proId: text("proId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  writerId: text("writerId").references(() => user.id, {
    onDelete: "cascade",
  }),
  isRecommanded: boolean("isRecommanded").default(false).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const ratingsRelations = relations(ratings, ({ one }) => ({
  for: one(organization, {
    fields: [ratings.proId],
    references: [organization.id],
  }),
  writer: one(user, {
    fields: [ratings.writerId],
    references: [user.id],
  }),
}));

export type Rating = InferSelectModel<typeof ratings> & {
  writer: InferSelectModel<typeof user>;
  for: InferSelectModel<typeof organization>;
};
export type CreateRating = typeof ratings.$inferInsert;

export const CreateRatingSchema = createInsertSchema(ratings);
