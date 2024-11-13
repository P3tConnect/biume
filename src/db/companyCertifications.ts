import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { organizationDocuments } from "./companyDocuments";
import { relations } from "drizzle-orm";

export const organizationCertifications = pgTable("organization_certifications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  organizationDocumentsId: text("organizationDocumentsId").references(() => organizationDocuments.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt").default(new Date()),
  updatedAt: timestamp("updatedAt"),
});

export const companyCertificationsRelations = relations(
  organizationCertifications,
  ({ one }) => ({
    organizationDocuments: one(organizationDocuments, {
      fields: [organizationCertifications.organizationDocumentsId],
      references: [organizationDocuments.id],
    }),
  }),
);

export type CompanyCertifications = typeof organizationCertifications.$inferSelect;
export type CreateCompanyCertifications =
  typeof organizationCertifications.$inferInsert;

export const SelectCompanyCertificationsSchema = createSelectSchema(
  organizationCertifications,
);
export const CreateCompanyCertificationsSchema = createInsertSchema(
  organizationCertifications,
);
