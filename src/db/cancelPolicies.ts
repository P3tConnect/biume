import { InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { organization } from "./organization";

export const cancelPolicies = pgTable("cancel_policies", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  daysBefore: integer("daysBefore").notNull(),
  refundPercent: integer("refundPercent").notNull(),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const cancelPoliciesRelations = relations(cancelPolicies, ({ one }) => ({
  organization: one(organization, {
    fields: [cancelPolicies.organizationId],
    references: [organization.id],
  }),
}));

export type CancelPolicy = InferSelectModel<typeof cancelPolicies> & {
  organization: InferSelectModel<typeof organization>;
};
export type CreateCancelPolicy = typeof cancelPolicies.$inferInsert;

export const CreateCancelPolicySchema = createInsertSchema(cancelPolicies);
