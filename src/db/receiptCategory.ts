import { pgTable, text } from "drizzle-orm/pg-core";
import { receipt } from "./receipts";
import { category } from "./category";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const receiptCategory = pgTable("receip_category", {
    receiptId: text("receiptId").references(() => receipt.id, {
        onDelete: "cascade",
    }),
    categoryId: text("categoryId").references(() => category.id, {
        onDelete: "cascade",
    }),
});

export const receiptCategoryRelations = relations(
    receiptCategory,
    ({ one }) => ({
        receipt: one(receipt, {
            fields: [receiptCategory.receiptId],
            references: [receipt.id],
        }),
        category: one(category, {
            fields: [receiptCategory.categoryId],
            references: [category.id],
        }),
    }),
);

export type ReceiptCategory = typeof receiptCategory.$inferSelect;
export type CreateReceiptCategory = typeof receiptCategory.$inferInsert;

export const CreateReceiptCategorySchema = createInsertSchema(receiptCategory);
