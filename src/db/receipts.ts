import { relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { receiptProduct } from "./receiptProducts";
import { company } from "./company";
import { createInsertSchema } from "drizzle-zod";

export const receipt = pgTable("receipt", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    image: text("image"),
    companyId: text("companyId").references(() => company.id, {
        onDelete: "cascade",
    }),
    totalPrice: integer("totalPrice"),
    createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const receiptRelations = relations(receipt, ({ one, many }) => ({
    products: many(receiptProduct),
    company: one(company, {
        fields: [receipt.companyId],
        references: [company.id],
    }),
}));

export type Receipt = typeof receipt.$inferSelect;
export type CreateReceipt = typeof receipt.$inferInsert;

export const CreateReceiptSchema = createInsertSchema(receipt);
