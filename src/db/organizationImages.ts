import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { organization, Organization } from "./organization";

export const organizationImages = pgTable("organization_images", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  organizationId: text("organization_id").references(() => organization.id),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const organizationImagesRelations = relations(
  organizationImages,
  ({ one }) => ({
    organization: one(organization, {
      fields: [organizationImages.organizationId],
      references: [organization.id],
    }),
  }),
);

export type OrganizationImage = typeof organizationImages.$inferSelect & {
  organization: Organization;
};
export type CreateOrganizationImage = typeof organizationImages.$inferInsert;

export const organizationImagesInsertSchema =
  createInsertSchema(organizationImages);
export const organizationImagesSelectSchema =
  createSelectSchema(organizationImages);
