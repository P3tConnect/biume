import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { receiptCategory } from "./receiptCategory";
import { createInsertSchema } from "drizzle-zod";
import { Organization, organization } from "./organization";

export const category = pgTable("category", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  ownerId: text("ownerId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const categoryRelations = relations(category, ({ one, many }) => ({
  owner: one(organization, {
    fields: [category.ownerId],
    references: [organization.id],
  }),
  receipts: many(receiptCategory),
}));

export type Category = InferSelectModel<typeof category> & {
  owner: Organization;
};
export type CreateCategory = typeof category.$inferInsert;

export const CreateCategorySchema = createInsertSchema(category);
