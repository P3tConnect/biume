import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { Organization, organization } from "./organization";
import { user } from "./user";

export const address = pgTable("address", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  lat: integer("lat"),
  lng: integer("lng"),
  zip: integer("zip"),
  city: text("city").notNull(),
  postalAddress: text("postalAddress").notNull(),
  cntryCode: text("cntryCode"),
  userId: text("userId").references(() => user.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt").default(new Date()),
  updatedAt: timestamp("updatedAt"),
});

export const addressRelations = relations(address, ({ one }) => ({
  user: one(user, {
    fields: [address.userId],
    references: [user.id],
  }),
}));

export type Address = InferSelectModel<typeof address> & {
  organization: Organization;
};
export type CreateAddress = typeof address.$inferInsert;

export const CreateAddressSchema = createInsertSchema(address);
