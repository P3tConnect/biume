import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { cancelPolicies } from "./cancelPolicies";
import { company } from "./company";

export const refundStages = pgTable("refund_stages", {
  id: serial("id").primaryKey(),
  cancelPoliciesId: text("cancelPoliciesId").references(
    () => cancelPolicies.id,
    { onDelete: "cascade" },
  ),
  companyId: text("companyId").references(() => company.id, {
    onDelete: "cascade",
  }),
  refundPercent: integer("refundPercent").notNull(),
});
