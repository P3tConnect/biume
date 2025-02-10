import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { organizationCertifications } from "./organizationCertifications";
import { organization } from "./organization";

export const organizationDocuments = pgTable("organization_documents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  file: text("file").notNull().default(""),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organization.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const organizationDocumentsRelations = relations(
  organizationDocuments,
  ({ one, many }) => ({
    organization: one(organization, {
      fields: [organizationDocuments.organizationId],
      references: [organization.id],
    }),
    certifications: many(organizationCertifications),
  }),
);

export type OrganizationDocuments = InferSelectModel<
  typeof organizationDocuments
> & {
  organization: InferSelectModel<typeof organization>;
  certifications: InferSelectModel<typeof organizationCertifications>[];
};
export type CreateOrganizationDocuments =
  typeof organizationDocuments.$inferInsert;

export const OrganizationDocumentsSchema = createInsertSchema(
  organizationDocuments,
);
export const CreateOrganizationDocumentsSchema = createInsertSchema(
  organizationDocuments,
);
