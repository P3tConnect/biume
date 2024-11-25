import {
  boolean,
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { invoice } from "./invoice";
import { sessionOptions } from "./sessionOptions";
import { pets } from "./pets";
import { report } from "./report";
import { observation } from "./observation";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { service } from "./service";
import { organization } from "./organization";
import { user } from "./user";

export const sessionType = pgEnum("session_type", ["oneToOne", "multiple"]);

export const sessionStatusType = pgEnum("session_status_type", [
  "CLIENT PAYED",
  "CLIENT PENDING",
  "CLIENT CANCELED",
  "CLIENT ACCEPTED",
  "COMPANY PENDING",
  "COMPANY ACCEPTED",
  "COMPANY CANCELED",
  "COMPANY POSTPONED",
]);

export const proSession = pgTable("pro_session", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  proId: text("proId").references(() => organization.id, { onDelete: "cascade" }),
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
  serviceId: text("serviceId").notNull().references(() => service.id, {
    onDelete: "cascade",
  }),
  beginAt: date("beginAt").notNull(),
  endAt: date("endAt").notNull(),
  status: sessionStatusType("status").default("COMPANY PENDING").notNull(),
  atHome: boolean("atHome").default(false).notNull(),
  type: sessionType("type").default("oneToOne").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updated: timestamp("updatedAt", { mode: "date" }),
});

export const proSessionRelations = relations(proSession, ({ one, many }) => ({
  pro: one(organization, {
    fields: [proSession.proId],
    references: [organization.id],
  }),
  invoice: one(invoice),
  service: one(service, {
    fields: [proSession.serviceId],
    references: [service.id],
  }),
  options: many(sessionOptions),
  pet: one(pets, {
    fields: [proSession.patientId],
    references: [pets.id],
  }),
  report: one(report, {
    fields: [proSession.reportId],
    references: [report.id],
  }),
  observation: one(observation, {
    fields: [proSession.observationId],
    references: [observation.id],
  }),
  client: one(user, {
    fields: [proSession.clientId],
    references: [user.id],
  }),
}));

export type ProSession = typeof proSession.$inferSelect;
export type CreateProSession = typeof proSession.$inferInsert;
export const SessionTypeEnum = z.enum(sessionType.enumValues);
export const SessionStatusTypeEnum = z.enum(sessionStatusType.enumValues);

export const ProSessionSchema = createSelectSchema(proSession);
export const CreateProSessionSchema = createInsertSchema(proSession);
