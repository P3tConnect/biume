import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { receipt } from "./receipts";
import { product } from "./products";
import { createInsertSchema } from "drizzle-zod";

export const receiptProduct = pgTable("receipt_product", {
  receiptId: text("receiptId").references(() => receipt.id, {
    onDelete: "cascade",
  }),
  productId: text("productId").references(() => product.id, {
    onDelete: "cascade",
  }),
});

export const receiptProductRelations = relations(receiptProduct, ({ one }) => ({
  receipt: one(receipt),
  company: one(product, {
    fields: [receiptProduct.productId],
    references: [product.id],
  }),
}));

export type ReceiptProduct = typeof receiptProduct.$inferSelect;
export type CreateReceiptProduct = typeof receiptProduct.$inferInsert;

export const CreateReceiptProductSchema = createInsertSchema(receiptProduct);
