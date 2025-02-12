import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { OrganizationDocuments, organizationDocuments } from "./organizationDocuments";
import { InferSelectModel, relations } from "drizzle-orm";

export const organizationCertifications = pgTable(
  "organization_certifications",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description"),
    image: text("image"),
    organizationDocumentsId: text("organizationDocumentsId").references(
      () => organizationDocuments.id,
      {
        onDelete: "cascade",
      },
    ),
    createdAt: timestamp("createdAt").default(new Date()),
    updatedAt: timestamp("updatedAt"),
  },
);

export const companyCertificationsRelations = relations(
  organizationCertifications,
  ({ one }) => ({
    organizationDocuments: one(organizationDocuments, {
      fields: [organizationCertifications.organizationDocumentsId],
      references: [organizationDocuments.id],
    }),
  }),
);

export type OrganizationCertifications = InferSelectModel<
  typeof organizationCertifications
> & {
  organizationDocuments: OrganizationDocuments;
};
export type CreateOrganizationCertifications =
  typeof organizationCertifications.$inferInsert;

export const SelectOrganizationCertificationsSchema = createSelectSchema(
  organizationCertifications,
);
export const CreateOrganizationCertificationsSchema = createInsertSchema(
  organizationCertifications,
);
