import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { companyDocuments } from "./companyDocuments";
import { relations } from "drizzle-orm";

export const companyCertifications = pgTable("company_certifications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  companyDocumentsId: text("companyId").references(() => companyDocuments.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt").default(new Date()),
  updatedAt: timestamp("updatedAt"),
});

export const companyCertificationsRelations = relations(
  companyCertifications,
  ({ one }) => ({
    companyDocuments: one(companyDocuments),
  }),
);

export type CompanyCertifications = typeof companyCertifications.$inferSelect;
export type CreateCompanyCertifications =
  typeof companyCertifications.$inferInsert;

export const SelectCompanyCertificationsSchema = createSelectSchema(
  companyCertifications,
);
export const CreateCompanyCertificationsSchema = createInsertSchema(
  companyCertifications,
);
