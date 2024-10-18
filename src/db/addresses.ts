import { relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const address = pgTable("address", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  lat: integer("lat"),
  lng: integer("lng"),
  zip: integer("zip"),
  postalAddress: text("postalAddress").notNull(),
  cntryCode: text("cntryCode"),
  createdAt: timestamp("createdAt").default(new Date()),
  updatedAt: timestamp("updatedAt"),
});

export type Address = typeof address.$inferSelect;
export type CreateAddress = typeof address.$inferInsert;

export const CreateAddressSchema = createInsertSchema(address);
