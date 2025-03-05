import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { Organization, organization } from "./organization";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { Service, service } from "./service";
import { Appointment, appointments } from "./appointments";

export const organizationSlotsType = pgEnum("organization_slots_type", [
  "unique",
  "recurring",
]);

export const organizationSlots = pgTable("organization_slots", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  serviceId: text("serviceId").references(() => service.id, {
    onDelete: "cascade",
  }),
  start: timestamp("start").notNull(),
  end: timestamp("end").notNull(),
  type: organizationSlotsType("type").notNull().default("unique"),
  isAvailable: boolean("isAvailable").notNull().default(true),
  recurrenceId: text("recurrenceId"),
  createdAt: timestamp("createdAt").notNull().default(new Date()),
  updatedAt: timestamp("updatedAt"),
});

export const organizationSlotsRelations = relations(
  organizationSlots,
  ({ one }) => ({
    organization: one(organization, {
      fields: [organizationSlots.organizationId],
      references: [organization.id],
    }),
    service: one(service, {
      fields: [organizationSlots.serviceId],
      references: [service.id],
    }),
    appointments: one(appointments),
  }),
);

export type OrganizationSlots = InferSelectModel<typeof organizationSlots> & {
  organization: Organization;
  service: Service;
  appointments: Appointment;
};

export const CreateOrganizationSlotsSchema =
  createInsertSchema(organizationSlots);
