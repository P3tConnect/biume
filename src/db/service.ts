import { InferSelectModel, relations } from "drizzle-orm"
import { integer, pgEnum, pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { Appointment, appointments } from "./appointments"
import { Organization, organization } from "./organization"
import { OrganizationSlots, organizationSlots } from "./organizationSlots"

export const serviceType = pgEnum("service_type", ["ONE_TO_ONE", "MULTIPLE"])

export const service = pgTable("service", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  image: text("image"),
  name: text("name"),
  description: text("description"),
  price: integer("price"),
  organizationId: text("proId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  duration: integer("duration"), // in minutes
  atHome: boolean("atHome").default(false),
  type: serviceType("type").default("ONE_TO_ONE").notNull(),
  places: integer("places").default(1),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const servicesRelations = relations(service, ({ one, many }) => ({
  organization: one(organization, {
    fields: [service.organizationId],
    references: [organization.id],
  }),
  appointments: many(appointments),
  organizationSlots: many(organizationSlots),
}))

export type Service = InferSelectModel<typeof service> & {
  organization: Organization
  appointments: Appointment[]
  organizationSlots: OrganizationSlots[]
}
export type CreateService = typeof service.$inferInsert

export const CreateServiceSchema = createInsertSchema(service)
export const ServiceSchema = createSelectSchema(service)
