import { InferSelectModel, relations } from "drizzle-orm";
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
  receipt: one(receipt, {
    fields: [receiptProduct.receiptId],
    references: [receipt.id],
  }),
  product: one(product, {
    fields: [receiptProduct.productId],
    references: [product.id],
  }),
}));

export type ReceiptProduct = InferSelectModel<typeof receiptProduct> & {
  receipt: InferSelectModel<typeof receipt>;
  product: InferSelectModel<typeof product>;
};
export type CreateReceiptProduct = typeof receiptProduct.$inferInsert;

export const CreateReceiptProductSchema = createInsertSchema(receiptProduct);
