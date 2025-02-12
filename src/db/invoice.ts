import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { InvoiceOption, invoiceOptions } from "./invoiceOptions";
import { createInsertSchema } from "drizzle-zod";
import { Appointment, appointments } from "./appointments";

export const invoice = pgTable("invoice", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  total: integer("total"),
  appointmentId: text("appointmentId").references(() => appointments.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
  options: many(invoiceOptions),
  appointment: one(appointments, {
    fields: [invoice.appointmentId],
    references: [appointments.id],
  }),
}));

export type Invoice = InferSelectModel<typeof invoice> & {
  options: InvoiceOption[];
  appointment: Appointment;
};
export type CreateInvoice = typeof invoice.$inferInsert;

export const CreateInvoiceSchema = createInsertSchema(invoice);
