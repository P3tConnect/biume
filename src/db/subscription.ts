import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { user } from "./user";
import { plan } from "./plan";

export const subscription = pgTable("subscription", {
  id: serial("id").primaryKey(),
  lemonSqueezyId: text("lemonSqueezyId").unique().notNull(),
  orderId: integer("orderId").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull(),
  statusFormatted: text("statusFormatted").notNull(),
  renewsAt: text("renewsAt"),
  endsAt: text("endsAt"),
  trialEndsAt: text("trialEndsAt"),
  price: text("price").notNull(),
  isUsageBased: boolean("isUsageBased").default(false),
  isPaused: boolean("isPaused").default(false),
  subscriptionItemId: serial("subscriptionItemId"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  planId: integer("planId")
    .notNull()
    .references(() => plan.id),
});

export type NewSubscription = typeof subscription.$inferInsert;
