import {
  boolean,
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { Invoice, invoice } from "./invoice";
import { SessionOption, sessionOptions } from "./sessionOptions";
import { Pet, pets } from "./pets";
import { report } from "./report";
import { Observation, observation } from "./observation";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { Service, service } from "./service";
import { Organization, organization } from "./organization";
import { User, user } from "./user";

export const appointmentType = pgEnum("appointment_type", [
  "oneToOne",
  "multiple",
]);

export const appointmentStatusType = pgEnum("appointment_status_type", [
  "CLIENT PAYED",
  "CLIENT PENDING",
  "CLIENT CANCELED",
  "CLIENT ACCEPTED",
  "COMPANY PENDING",
  "COMPANY ACCEPTED",
  "COMPANY CANCELED",
  "COMPANY POSTPONED",
]);

export const appointments = pgTable("appointments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  proId: text("proId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  clientId: text("clientId").references(() => user.id, { onDelete: "cascade" }),
  patientId: text("patientId").references(() => pets.id, {
    onDelete: "cascade",
  }),
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
  beginAt: date("beginAt").notNull(),
  endAt: date("endAt").notNull(),
  status: appointmentStatusType("status").default("COMPANY PENDING").notNull(),
  atHome: boolean("atHome").default(false).notNull(),
  type: appointmentType("type").default("oneToOne").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updated: timestamp("updatedAt", { mode: "date" }),
});

export const appointmentsRelations = relations(
  appointments,
  ({ one, many }) => ({
    pro: one(organization, {
      fields: [appointments.proId],
      references: [organization.id],
    }),
    invoice: one(invoice),
    service: one(service, {
      fields: [appointments.serviceId],
      references: [service.id],
    }),
    options: many(sessionOptions),
    pet: one(pets, {
      fields: [appointments.patientId],
      references: [pets.id],
    }),
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
  }),
);

export type Appointment = InferSelectModel<typeof appointments> & {
  pro: Organization;
  invoice: Invoice;
  service: Service;
  options: SessionOption[];
  pet: Pet;
  report: Report;
  observation: Observation;
  client: InferSelectModel<typeof user>;
};
export type CreateAppointment = typeof appointments.$inferInsert;

export const AppointmentSchema = createSelectSchema(appointments);
export const CreateAppointmentSchema = createInsertSchema(appointments);
