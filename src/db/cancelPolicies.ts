import { pgTable, serial } from "drizzle-orm/pg-core";

export const cancelPolicies = pgTable("cancel_policies", {
  id: serial("id").primaryKey(),
});
