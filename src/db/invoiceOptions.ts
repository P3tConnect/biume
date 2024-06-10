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
