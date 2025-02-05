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
import { InferSelectModel, relations } from "drizzle-orm";
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
import { invitation } from "./invitation";
import { appointments } from "./appointments";
import { user } from "./user";

export const plan = pgEnum("plan", ["BASIC", "PREMIUM", "ULTIMATE", "NONE"]);

export const companyType = pgEnum("companyType", [
  "NONE",
  "AUTO-ENTREPRENEUR",
  "SARL",
  "SAS",
  "EIRL",
  "SASU",
  "EURL",
  "OTHER",
]);

export const PlanEnum = z.enum(plan.enumValues);
export const CompanyTypeEnum = z.enum(companyType.enumValues);

export const organization = pgTable("organizations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  coverImage: text("coverImage"),
  description: text("description"),
  createdAt: timestamp("createdAt").notNull(),
  verified: boolean("verified").notNull().default(false),
  metadata: text("metadata"),
  stripeId: text("stripeId"),
  onBoardingComplete: boolean("onBoardingComplete").notNull().default(false),
  openAt: date("openAt"),
  closeAt: date("closeAt"),
  email: text("email").unique(),
  companyType: companyType("companyType").default("NONE"),
  atHome: boolean("atHome").notNull().default(false),
  plan: plan("plan").default("NONE"),
  progressionId: text("progressionId").references(() => progression.id, {
    onDelete: "cascade",
  }),
  addressId: text("address").references(() => address.id, {
    onDelete: "cascade",
  }),
  nac: text("nac"),
  locked: boolean("locked").notNull().default(false),
  lang: text("lang").notNull().default("fr"),
  siren: text("siren"),
  siret: text("siret"),
  updatedAt: timestamp("updatedAt"),
});

export const organizationRelations = relations(
  organization,
  ({ one, many }) => ({
    reportTemplates: many(reportTemplate),
    progression: one(progression, {
      fields: [organization.progressionId],
      references: [progression.id],
    }),
    documents: many(organizationDocuments),
    appointments: many(appointments),
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
    invitations: many(invitation),
  }),
);

export type Organization = InferSelectModel<typeof organization> & {
  address: InferSelectModel<typeof organizationAddress>;
  ratings: InferSelectModel<typeof ratings>;
  services: InferSelectModel<typeof service>[];
  options: InferSelectModel<typeof options>[];
  categories: InferSelectModel<typeof category>[];
  topics: InferSelectModel<typeof topic>[];
  products: InferSelectModel<typeof product>[];
  newslettersWritter: InferSelectModel<typeof newsletter>[];
  receipts: InferSelectModel<typeof receipt>[];
};
export type CreateOrganization = typeof organization.$inferInsert;

export const OrganizationSchema = createSelectSchema(organization);
export const CreateOrganizationSchema = createInsertSchema(organization);
