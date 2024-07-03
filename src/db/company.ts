import { relations } from "drizzle-orm";
import { boolean, date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { alertsTypes } from "./alertTypes";
import { cancelPolicies } from "./cancelPolicies";
import { companyDocuments } from "./companyDocuments";
import { employeeCompany } from "./employeeCompany";
import { newsletter } from "./newsletter";
import { options } from "./options";
import { product } from "./products";
import { progression } from "./progression";
import { project } from "./project";
import { ratings } from "./ratings";
import { receiptProduct } from "./receiptProducts";
import { receipt } from "./receipts";
import { service } from "./service";
import { task } from "./task";
import { topic } from "./topic";
import { user } from "./user";
import { category } from "./category";
import { companyAddress } from "./companyAddress";

export const company = pgTable("company", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  logo: text("logo"),
  coverImage: text("coverImage"),
  description: text("description"),
  addressId: text("address").references(() => companyAddress.id, {
    onDelete: "cascade",
  }),
  openAt: date("openAt"),
  closeAt: date("closeAt"),
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
  owner: one(user, {
    fields: [company.ownerId],
    references: [user.id],
  }),
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
  receipts: many(receipt),
  products: many(product),
  topics: many(topic),
  categories: many(category),
  address: one(companyAddress, {
    fields: [company.addressId],
    references: [companyAddress.id],
  }),
}));

export type Company = typeof company.$inferSelect;
export type CreateCompany = typeof company.$inferInsert;

export const CreateCompanySchema = createInsertSchema(company);
