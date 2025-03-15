import { AppointmentOption, appointmentOptions } from "./appointmentOptions"
import { InferSelectModel, relations } from "drizzle-orm"
import { Invoice, invoice } from "./invoice"
import { Observation, observation } from "./observation"
import { Organization, organization } from "./organization"
import { Pet, pets } from "./pets"
import { Service, service } from "./service"
import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { OrganizationSlots, organizationSlots } from "./organizationSlots"
import { report } from "./report"
import { user } from "./user"
import { petAppointments } from "./pet_appointments"

export const appointmentType = pgEnum("appointment_type", ["oneToOne", "multiple"])

export const appointmentStatusType = pgEnum("appointment_status_type", [
  "CREATED",
  "DRAFT",
  "PENDING PAYMENT",
  "SCHEDULED",
  "PAYED",
  "CONFIRMED",
  "DENIED",
  "CANCELED",
  "POSTPONED",
  "ONGOING",
  "COMPLETED",
])

export const appointments = pgTable("appointments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  proId: text("proId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  clientId: text("clientId").references(() => user.id, { onDelete: "cascade" }),
  reportId: text("reportId").references(() => report.id, {
    onDelete: "cascade",
  }),
  observationId: text("observationId").references(() => observation.id, {
    onDelete: "cascade",
  }),
  serviceId: text("serviceId")
    .notNull()
    .references(() => service.id, {
      onDelete: "cascade",
    }),
  slotId: text("slotId").references(() => organizationSlots.id, {
    onDelete: "cascade",
  }),
  beginAt: timestamp("beginAt"),
  payedOnline: boolean("payedOnline"),
  endAt: timestamp("endAt"),
  status: appointmentStatusType("status").default("PENDING PAYMENT").notNull(),
  atHome: boolean("atHome").default(false).notNull(),
  type: appointmentType("type").default("oneToOne").notNull(),
  deniedReason: text("deniedReason"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updated: timestamp("updatedAt", { mode: "date" }),
})

export const appointmentsRelations = relations(appointments, ({ one, many }) => ({
  pro: one(organization, {
    fields: [appointments.proId],
    references: [organization.id],
  }),
  invoices: many(invoice),
  service: one(service, {
    fields: [appointments.serviceId],
    references: [service.id],
  }),
  options: many(appointmentOptions),
  pets: many(petAppointments),
  report: one(report, {
    fields: [appointments.reportId],
    references: [report.id],
  }),
  observation: one(observation, {
    fields: [appointments.observationId],
    references: [observation.id],
  }),
  client: one(user, {
    fields: [appointments.clientId],
    references: [user.id],
  }),
  slot: one(organizationSlots, {
    fields: [appointments.slotId],
    references: [organizationSlots.id],
  }),
}))

export type Appointment = InferSelectModel<typeof appointments> & {
  pro: Organization
  invoice: Invoice
  service: Service
  options: AppointmentOption[]
  pet: Pet
  report: Report
  observation: Observation
  client: InferSelectModel<typeof user>
  slot: OrganizationSlots
}
export type CreateAppointment = typeof appointments.$inferInsert

export const AppointmentSchema = createSelectSchema(appointments)
export const CreateAppointmentSchema = createInsertSchema(appointments)
