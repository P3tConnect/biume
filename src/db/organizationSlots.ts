import { boolean, date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { Organization, organization } from "./organization";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const organizationSlots = pgTable("organization_slots", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  start: date("start").notNull(),
  end: date("end").notNull(),
  isAvailable: boolean("isAvailable").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().default(new Date()),
  updatedAt: timestamp("updatedAt"),
});

export const organizationSlotsRelations = relations(organizationSlots, ({ one }) => ({
  organization: one(organization, {
    fields: [organizationSlots.organizationId],
    references: [organization.id],
  }),
}));

export type OrganizationSlots = InferSelectModel<typeof organizationSlots> & {
  organization: Organization;
};

export const CreateOrganizationSlotsSchema = createInsertSchema(organizationSlots);
