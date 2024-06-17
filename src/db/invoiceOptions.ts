import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { invoice } from "./invoice";
import { options } from "./options";

export const invoiceOptions = pgTable("invoice_options", {
  invoiceId: text("invoiceId").references(() => invoice.id, {
    onDelete: "cascade",
  }),
  optionId: text("optionId").references(() => options.id, {
    onDelete: "cascade",
  }),
});

export const invoiceOptionsRelations = relations(invoiceOptions, ({ one }) => ({
  invoice: one(invoice, {
    fields: [invoiceOptions.invoiceId],
    references: [invoice.id],
  }),
  options: one(options, {
    fields: [invoiceOptions.optionId],
    references: [options.id],
  }),
}));

export type InvoiceOption = typeof invoiceOptions.$inferSelect;
export type CreateInvoiceOption = typeof invoiceOptions.$inferInsert;
