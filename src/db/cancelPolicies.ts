import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { createInsertSchema } from "drizzle-zod";

export const cancelPolicies = pgTable("cancel_policies", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    daysBefore: integer("daysBefore").notNull(),
    refundPercent: integer("refundPercent").notNull(),
    companyId: text("companyId").references(() => company.id, {
        onDelete: "cascade",
    }),
    createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const cancelPoliciesRelations = relations(cancelPolicies, ({ one }) => ({
    company: one(company, {
        fields: [cancelPolicies.companyId],
        references: [company.id],
    }),
}));

export type CancelPolicy = typeof cancelPolicies.$inferSelect;
export type CreateCancelPolicy = typeof cancelPolicies.$inferInsert;

export const CreateCancelPolicySchema = createInsertSchema(cancelPolicies);
