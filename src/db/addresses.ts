import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { organization } from "./organization";

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

export type Address = InferSelectModel<typeof address> & {
  organization: InferSelectModel<typeof organization>;
};
export type CreateAddress = typeof address.$inferInsert;

export const CreateAddressSchema = createInsertSchema(address);
