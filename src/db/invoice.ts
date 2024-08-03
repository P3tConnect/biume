import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { invoiceOptions } from "./invoiceOptions";
import { createInsertSchema } from "drizzle-zod";
import { askEstimate } from "./ask_estimate";

export const invoice = pgTable("invoice", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  askEstimateId: text("askEstimateId").references(() => askEstimate.id, {
    onDelete: "cascade",
  }),
  total: integer("total"),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
  options: many(invoiceOptions),
  askEstimate: one(askEstimate, {
    fields: [invoice.askEstimateId],
    references: [askEstimate.id],
  }),
}));

export type Invoice = typeof invoice.$inferSelect;
export type CreateInvoice = typeof invoice.$inferInsert;

export const CreateInvoiceSchema = createInsertSchema(invoice);
