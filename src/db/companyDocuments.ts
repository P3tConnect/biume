import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { company } from "./company";

export const companyDocuments = pgTable("company_documents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  siren: text("siren"),
  siret: text("siret"),
  certifications: text("certifications"),
});

export const companyDocumentsRelations = relations(
  companyDocuments,
  ({ one }) => ({
    company: one(company),
  }),
);
