import { InferSelectModel, relations } from "drizzle-orm"
import { boolean, date, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { address } from "./addresses"
import { appointments } from "./appointments"
import { bgJobs } from "./bgJobs"
import { cancelPolicies } from "./cancelPolicies"
import { ClientNote, clientNote } from "./clientNote"
import { invitation } from "./invitation"
import { Member, member } from "./member"
import { options } from "./options"
import { Option } from "./options"
import { OrganizationAddress, organizationAddress } from "./organizationAddress"
import { organizationDocuments } from "./organizationDocuments"
import { OrganizationImage, organizationImages } from "./organizationImages"
import { OrganizationSlots, organizationSlots } from "./organizationSlots"
import { progression } from "./progression"
import { Rating, ratings } from "./ratings"
import { Service, service } from "./service"
import { transaction } from "./transaction"
import { widgets } from "./widgets"
import { Invoice, invoice } from "./invoice"
import { MedicalRecordAccess, medicalRecordAccess } from "./medicalRecordAccess"
import { report, Report } from "./report"

export const plan = pgEnum("plan", ["BASIC", "PREMIUM", "ULTIMATE", "NONE"])

export const companyType = pgEnum("companyType", [
  "NONE",
  "AUTO-ENTREPRENEUR",
  "SARL",
  "SAS",
  "EIRL",
  "SASU",
  "EURL",
  "OTHER",
])

export const PlanEnum = z.enum(plan.enumValues)
export const CompanyTypeEnum = z.enum(companyType.enumValues)

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
  website: text("website").default(""),
  instagram: text("instagram").default(""),
  facebook: text("facebook").default(""),
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
})

export const organizationRelations = relations(organization, ({ one, many }) => ({
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
  invoices: many(invoice),
  medicalRecordAccess: many(medicalRecordAccess),
  reports: many(report),
}))

export type Organization = InferSelectModel<typeof organization> & {
  address: OrganizationAddress
  members: Member[]
  ratings: Rating[]
  services: Service[]
  options: Option[]
  clientNotes: ClientNote[]
  images: OrganizationImage[]
  slots: OrganizationSlots[]
  invoices: Invoice[]
  medicalRecordAccess: MedicalRecordAccess[]
  reports: Report[]
}
export type CreateOrganization = typeof organization.$inferInsert

export const OrganizationSchema = createSelectSchema(organization)
export const CreateOrganizationSchema = createInsertSchema(organization)
