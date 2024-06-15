import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { cancelPolicies } from "./cancelPolicies";
import { relations } from "drizzle-orm";
import { progression } from "./progression";
import { companyDocuments } from "./companyDocuments";
import { project } from "./project";
import { employeeCompany } from "./employeeCompany";
import { alertsTypes } from "./alertTypes";
import { ratings } from "./ratings";
import { service } from "./service";
import { options } from "./options";

export const company = pgTable("company", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  logo: text("logo"),
  coverImage: text("coverImage"),
  description: text("description"),
  address: text("address").notNull(),
  email: text("email").notNull().unique(),
  ownerId: text("ownerId").references(() => user.id, { onDelete: "cascade" }),
  siret: text("siret").notNull(),
  siren: text("siren").notNull(),
  atHome: boolean("atHome").notNull(),
  documentsId: text("documentsId").references(() => companyDocuments.id, {
    onDelete: "cascade",
  }),
  progressionId: text("progressionId").references(() => progression.id, {
    onDelete: "cascade",
  }),
  nac: text("nac"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});

export const companyRelations = relations(company, ({ one, many }) => ({
  employees: many(employeeCompany),
  progression: one(progression, {
    fields: [company.progressionId],
    references: [progression.id],
  }),
  documents: one(companyDocuments, {
    fields: [company.documentsId],
    references: [companyDocuments.id],
  }),
  cancelPolicies: many(cancelPolicies),
  projects: many(project),
  alertTypes: many(alertsTypes),
  ratings: many(ratings),
  services: many(service),
  options: many(options),
}));
