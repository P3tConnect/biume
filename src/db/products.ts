import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { receiptProduct } from "./receiptProducts";
import { createInsertSchema } from "drizzle-zod";
import { organization } from "./organization";

export const product = pgTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  quantity: integer("quantity").notNull(),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  unitPrice: integer("unitPrice").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const productRelations = relations(product, ({ one, many }) => ({
  receipts: many(receiptProduct),
  organization: one(organization, {
    fields: [product.organizationId],
    references: [organization.id],
  }),
}));

export type Product = InferSelectModel<typeof product> & {
  organization: InferSelectModel<typeof organization>;
};
export type CreateProduct = typeof product.$inferInsert;

export const CreateProductSchema = createInsertSchema(product);
