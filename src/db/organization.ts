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
import { progression } from "./progression";
import { cancelPolicies } from "./cancelPolicies";
import { Rating, ratings } from "./ratings";
import { Service, service } from "./service";
import { options } from "./options";
import { address } from "./addresses";
import {
  OrganizationAddress,
  organizationAddress,
} from "./organizationAddress";
import { Topic, topic } from "./topic";
import { transaction } from "./transaction";
import { widgets } from "./widgets";
import { bgJobs } from "./bgJobs";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { invitation } from "./invitation";
import { appointments } from "./appointments";
import { Option } from "./options";
import { Member, member } from "./member";
import { ClientNote, clientNote } from "./clientNote";
import { OrganizationImage, organizationImages } from "./organizationImages";
import { OrganizationSlots, organizationSlots } from "./organizationSlots";

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
  description: text("description"),
  createdAt: timestamp("createdAt").notNull(),
  verified: boolean("verified").notNull().default(false),
  metadata: text("metadata"),
  companyStripeId: text("companyStripeId"),
  customerStripeId: text("customerStripeId"),
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
  onDemand: boolean("onDemand").notNull().default(false),
  updatedAt: timestamp("updatedAt"),
});

export const organizationRelations = relations(
  organization,
  ({ one, many }) => ({
    progression: one(progression, {
      fields: [organization.progressionId],
      references: [progression.id],
    }),
    documents: many(organizationDocuments),
    appointments: many(appointments),
    cancelPolicies: many(cancelPolicies),
    ratings: many(ratings),
    services: many(service),
    options: many(options),
    topics: many(topic),
    address: one(organizationAddress, {
      fields: [organization.addressId],
      references: [organizationAddress.id],
    }),
    transactions: many(transaction),
    widgets: many(widgets),
    bgJobs: many(bgJobs),
    invitations: many(invitation),
    members: many(member),
    clientNotes: many(clientNote),
    images: many(organizationImages),
    slots: many(organizationSlots),
  }),
);

export type Organization = InferSelectModel<typeof organization> & {
  address: OrganizationAddress;
  members: Member[];
  ratings: Rating[];
  services: Service[];
  options: Option[];
  topics: Topic[];
  clientNotes: ClientNote[];
  images: OrganizationImage[];
  slots: OrganizationSlots[];
};
export type CreateOrganization = typeof organization.$inferInsert;

export const OrganizationSchema = createSelectSchema(organization);
export const CreateOrganizationSchema = createInsertSchema(organization);
