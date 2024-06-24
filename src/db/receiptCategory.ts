import { pgTable, text } from "drizzle-orm/pg-core";
import { receipt } from "./receipts";
import { category } from "./category";

export const receiptCategory = pgTable("receip_category", {
    receiptId: text("receiptId").references(() => receipt.id, {
        onDelete: "cascade",
    }),
    categoryId: text("categoryId").references(() => category.id, {
        onDelete: "cascade",
    }),
});
