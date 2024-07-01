import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { relations } from "drizzle-orm";
import { receiptCategory } from "./receiptCategory";
import { createInsertSchema } from "drizzle-zod";

export const category = pgTable("category", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: text("ownerId").references(() => company.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const categoryRelations = relations(category, ({ one, many }) => ({
  owner: one(company, {
    fields: [category.ownerId],
    references: [company.id],
  }),
  receipts: many(receiptCategory),
}));

export type Category = typeof category.$inferSelect;
export type CreateCategory = typeof category.$inferInsert;

export const CreateCategorySchema = createInsertSchema(category);
