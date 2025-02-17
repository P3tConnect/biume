import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import {
  AskAppointmentOption,
  askAppointmentOptions,
} from "./askAppointmentOptions";
import { InvoiceOption, invoiceOptions } from "./invoiceOptions";
import { AppointmentOption, appointmentOptions } from "./appointmentOptions";
import { createInsertSchema } from "drizzle-zod";
import { Organization, organization } from "./organization";

export const options = pgTable("options", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const optionsRelations = relations(options, ({ one, many }) => ({
  askAppointmentsOptions: many(askAppointmentOptions),
  invoicesOptions: many(invoiceOptions),
  appointmentsOptions: many(appointmentOptions),
  organization: one(organization, {
    fields: [options.organizationId],
    references: [organization.id],
  }),
}));

export type Option = InferSelectModel<typeof options> & {
  organization: Organization;
  askAppointmentsOptions: AskAppointmentOption[];
  invoicesOptions: InvoiceOption[];
  appointmentsOptions: AppointmentOption[];
};
export type CreateOption = typeof options.$inferInsert;

export const CreateOptionSchema = createInsertSchema(options);
