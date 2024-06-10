import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const cancelPolicies = pgTable("cancel_policies", {
  id: serial("id").primaryKey(),
  daysBefore: integer("daysBefore").notNull(),
});
