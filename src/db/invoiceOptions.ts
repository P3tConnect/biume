import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { invoice } from "./invoice";
import { options } from "./options";
import { createInsertSchema } from "drizzle-zod";

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

export type InvoiceOption = InferSelectModel<typeof invoiceOptions> & {
  invoice: InferSelectModel<typeof invoice>;
  options: InferSelectModel<typeof options>;
};
export type CreateInvoiceOption = typeof invoiceOptions.$inferInsert;

export const CreateInvoiceOptionsSchema = createInsertSchema(invoiceOptions);
