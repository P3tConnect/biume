import {
  date,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { sessionType } from "./pro_session";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { organization } from "./organization";

export const organizationDisponibilities = pgTable("organization_disponibilities", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  beginAt: date("beginAt").notNull(),
  endAt: date("endAt").notNull(),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const organizationDisponibilitiesRelations = relations(
  organizationDisponibilities,
  ({ one }) => ({
    organization: one(organization, {
      fields: [organizationDisponibilities.organizationId],
      references: [organization.id],
    }),
  }),
);

export type OrganizationDisponibilities = typeof organizationDisponibilities.$inferSelect;
export type CreateOrganizationDisponibilities =
  typeof organizationDisponibilities.$inferInsert;

export const OrganizationDisponibilitiesSchema = createInsertSchema(
  organizationDisponibilities,
);
export const CreateOrganizationDisponibilitiesSchema = createInsertSchema(
  organizationDisponibilities,
);
