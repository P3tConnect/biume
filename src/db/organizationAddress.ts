import { InferSelectModel, relations } from "drizzle-orm"
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { Organization, organization } from "./organization"

export const organizationAddress = pgTable("organization_address", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  lat: integer("lat"),
  lng: integer("lng"),
  zip: integer("zip"),
  postalAddress: text("postalAddress").notNull(),
  cntryCode: text("cntryCode"),
  createdAt: timestamp("createdAt").default(new Date()),
  updatedAt: timestamp("updatedAt"),
})

export const organizationAddressRelations = relations(organizationAddress, ({ one }) => ({
  organization: one(organization),
}))

export type OrganizationAddress = InferSelectModel<typeof organizationAddress> & {
  organization: Organization
}
export type CreateOrganizationAddress = typeof organizationAddress.$inferInsert

export const OrganizationAddressSchema = createSelectSchema(organizationAddress)
export const CreateOrganizationAddressSchema = createInsertSchema(organizationAddress)
