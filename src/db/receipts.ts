import { relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { receiptProduct } from "./receiptProducts";
import { createInsertSchema } from "drizzle-zod";
import { receiptCategory } from "./receiptCategory";
import { organization } from "./organization";

export const receipt = pgTable("receipt", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  image: text("image"),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  totalPrice: integer("totalPrice"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const receiptRelations = relations(receipt, ({ one, many }) => ({
  products: many(receiptProduct),
  organization: one(organization, {
    fields: [receipt.organizationId],
    references: [organization.id],
  }),
  categories: many(receiptCategory),
}));

export type Receipt = typeof receipt.$inferSelect;
export type CreateReceipt = typeof receipt.$inferInsert;

export const CreateReceiptSchema = createInsertSchema(receipt);
