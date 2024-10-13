import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { cancelPolicies } from "./cancelPolicies";
import { companyDocuments } from "./companyDocuments";
import { newsletter } from "./newsletter";
import { options } from "./options";
import { product } from "./products";
import { progression } from "./progression";
import { project } from "./project";
import { ratings } from "./ratings";
import { receipt } from "./receipts";
import { service } from "./service";
import { task } from "./task";
import { topic } from "./topic";
import { category } from "./category";
import { companyAddress } from "./companyAddress";
import { transaction } from "./transaction";
import { widgets } from "./widgets";
import { bgJobs } from "./bgJobs";
import { z } from "zod";
import { companyMembership } from "./company_membership";
import { reportTemplate } from "./report_template";

export const plan = pgEnum("plan", ["BASIC", "PREMIUM", "ULTIMATE", "NONE"]);

export const PlanEnum = z.enum(plan.enumValues);

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
  stripeId: text("stripeId"),
  email: text("email").notNull().unique(),
  atHome: boolean("atHome").notNull(),
  plan: plan("plan").default("NONE"),
  documentsId: text("documentsId").references(() => companyDocuments.id, {
    onDelete: "cascade",
  }),
  progressionId: text("progressionId").references(() => progression.id, {
    onDelete: "cascade",
  }),
  nac: text("nac"),
  locked: boolean("locked").notNull().default(false),
  lang: text("lang").default("fr"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});

export const companyRelations = relations(company, ({ one, many }) => ({
  memberships: many(companyMembership),
  reportTemplates: many(reportTemplate),
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
  transactions: many(transaction),
  widgets: many(widgets),
  bgJobs: many(bgJobs),
}));

export type Company = typeof company.$inferSelect;
export type CreateCompany = typeof company.$inferInsert;

export const CreateCompanySchema = createInsertSchema(company);
