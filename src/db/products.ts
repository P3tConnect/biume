import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { relations } from "drizzle-orm";
import { receiptProduct } from "./receiptProducts";
import { createInsertSchema } from "drizzle-zod";

export const product = pgTable("product", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description"),
    quantity: integer("quantity").notNull(),
    companyId: text("companyId").references(() => company.id, {
        onDelete: "cascade",
    }),
    unitPrice: integer("unitPrice").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const productRelations = relations(product, ({ one, many }) => ({
    receipts: many(receiptProduct),
    company: one(company, {
        fields: [product.companyId],
        references: [company.id],
    }),
}));

export type Product = typeof product.$inferSelect;
export type CreateProduct = typeof product.$inferInsert;

export const CreateProductSchema = createInsertSchema(product);
