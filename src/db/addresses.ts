import { relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const address = pgTable("address", {
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

export const addressRelations = relations(address, ({ one, many }) => ({
    owner: one(user),
}));
