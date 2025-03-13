import { InferSelectModel, relations } from "drizzle-orm"
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

import { Appointment, appointments } from "./appointments"
import { InvoiceOption, invoiceOptions } from "./invoiceOptions"
import { Organization, organization } from "./organization"
import { User, user } from "./user"

export const invoice = pgTable("invoice", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  total: integer("total"),
  appointmentId: text("appointmentId").references(() => appointments.id, {
    onDelete: "cascade",
  }),
  proId: text("proId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  clientId: text("clientId").references(() => user.id, {
    onDelete: "cascade",
  }),
  checkoutSessionId: text("checkoutSessionId"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
  options: many(invoiceOptions),
  appointment: one(appointments, {
    fields: [invoice.appointmentId],
    references: [appointments.id],
  }),
  pro: one(organization, {
    fields: [invoice.proId],
    references: [organization.id],
  }),
  client: one(user, {
    fields: [invoice.clientId],
    references: [user.id],
  }),
}))

export type Invoice = InferSelectModel<typeof invoice> & {
  options: InvoiceOption[]
  appointment: Appointment
  pro: Organization
  client: User
}
export type CreateInvoice = typeof invoice.$inferInsert

export const CreateInvoiceSchema = createInsertSchema(invoice)
