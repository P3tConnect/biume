import {
  boolean,
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { organizationDocuments } from "./organizationDocuments";
import { relations } from "drizzle-orm";
import { reportTemplate } from "./report_template";
import { progression } from "./progression";
import { cancelPolicies } from "./cancelPolicies";
import { project } from "./project";
import { task } from "./task";
import { ratings } from "./ratings";
import { service } from "./service";
import { options } from "./options";
import { address } from "./addresses";
import { organizationAddress } from "./organizationAddress";
import { category } from "./category";
import { topic } from "./topic";
import { product } from "./products";
import { newsletter } from "./newsletter";
import { receipt } from "./receipts";
import { transaction } from "./transaction";
import { widgets } from "./widgets";
import { bgJobs } from "./bgJobs";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { proSession } from "./pro_session";

export const plan = pgEnum("plan", ["BASIC", "PREMIUM", "ULTIMATE", "NONE"]);

export const PlanEnum = z.enum(plan.enumValues);

export const organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  coverImage: text("coverImage"),
  description: text("description"),
  createdAt: timestamp("createdAt").notNull(),
  metadata: text("metadata"),
  stripeId: text("stripeId"),
  onBoardingComplete: boolean("onBoardingComplete").notNull(),
  openAt: date("openAt").notNull(),
  closeAt: date("closeAt").notNull(),
  email: text("email").notNull().unique(),
  atHome: boolean("atHome").notNull(),
  plan: plan("plan").default("NONE"),
  documentsId: text("documentsId").references(() => organizationDocuments.id, {
    onDelete: "cascade",
  }),
  progressionId: text("progressionId").references(() => progression.id, {
    onDelete: "cascade",
  }),
  addressId: text("address").references(() => address.id, {
    onDelete: "cascade",
  }),
  nac: text("nac"),
  locked: boolean("locked").notNull().default(false),
  lang: text("lang").default("fr"),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const organizationRelations = relations(organization, ({ one, many }) => ({
  reportTemplates: many(reportTemplate),
  progression: one(progression, {
    fields: [organization.progressionId],
    references: [progression.id],
  }),
  documents: one(organizationDocuments, {
    fields: [organization.documentsId],
    references: [organizationDocuments.id],
  }),
  sessions: many(proSession),
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
  address: one(organizationAddress, {
    fields: [organization.addressId],
    references: [organizationAddress.id],
  }),
  transactions: many(transaction),
  widgets: many(widgets),
  bgJobs: many(bgJobs),
}));

export type Organization = typeof organization.$inferSelect;
export type CreateOrganization = typeof organization.$inferInsert;

export const OrganizationSchema = createSelectSchema(organization);
export const CreateOrganizationSchema = createInsertSchema(organization);