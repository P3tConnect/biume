import { relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";

export const companyAddress = pgTable("company_address", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    lat: integer("lat"),
    lng: integer("lng"),
    zip: integer("zip"),
    postalAddress: text("postalAddress").notNull(),
    createdAt: timestamp("createdAt").default(new Date()),
    updatedAt: timestamp("updatedAt"),
});

export const companyAddressRelations = relations(companyAddress, ({ one }) => ({
    company: one(company),
}));
