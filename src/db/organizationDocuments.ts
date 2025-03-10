import { InferSelectModel, relations } from "drizzle-orm"
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

import { Organization, organization } from "./organization"

export const organizationDocuments = pgTable("organization_documents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().default(""),
  file: text("file").notNull().default(""),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organization.id, {
      onDelete: "cascade",
    }),
  valid: boolean("valid").notNull().default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const organizationDocumentsRelations = relations(organizationDocuments, ({ one, many }) => ({
  organization: one(organization, {
    fields: [organizationDocuments.organizationId],
    references: [organization.id],
  }),
}))

export type OrganizationDocuments = InferSelectModel<typeof organizationDocuments> & {
  organization: Organization
}
export type CreateOrganizationDocuments = typeof organizationDocuments.$inferInsert

export const OrganizationDocumentsSchema = createInsertSchema(organizationDocuments)
export const CreateOrganizationDocumentsSchema = createInsertSchema(organizationDocuments)
