import { relations } from "drizzle-orm";
import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { alertsTypes } from "./alertTypes";
import { cancelPolicies } from "./cancelPolicies";
import { companyDocuments } from "./companyDocuments";
import { employeeCompany } from "./employeeCompany";
import { options } from "./options";
import { progression } from "./progression";
import { project } from "./project";
import { ratings } from "./ratings";
import { service } from "./service";
import { user } from "./user";
import { newsletter } from "./newsletter";
import { task } from "./task";

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
  tasks: many(task),
  alertTypes: many(alertsTypes),
  ratings: many(ratings),
  services: many(service),
  options: many(options),
  newslettersWritter: many(newsletter),
}));

export type Company = typeof company.$inferSelect;
export type CreateCompany = typeof company.$inferInsert;
