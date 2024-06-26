import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { createInsertSchema } from "drizzle-zod";

export const companyDocuments = pgTable("company_documents", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    siren: text("siren"),
    siret: text("siret"),
    certifications: text("certifications"),
    createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const companyDocumentsRelations = relations(
    companyDocuments,
    ({ one }) => ({
        company: one(company),
    }),
);

export type CompanyDocuments = typeof companyDocuments.$inferSelect;
export type CreateCompanyDocuments = typeof company.$inferInsert;

export const CreateCompanyDocumentsSchema =
    createInsertSchema(companyDocuments);
