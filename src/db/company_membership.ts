import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { company } from "./company";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const companyMembershipRole = pgEnum("company_membership_role", ["NONE", "MEMBER", "OWNER", "ADMIN"]);

export const CompanyMembershipRoleEnum = z.enum(companyMembershipRole.enumValues);

export const companyMembership = pgTable("company_membership", {
  companyId: text("companyId").references(() => company.id, {
    onDelete: "cascade",
  }),
  userId: text("userId").references(() => user.id, {
    onDelete: "cascade",
  }),
  role: text("role").notNull(),
  createdAt: timestamp("createdAt").default(new Date()),
  updatedAt: timestamp("updatedAt"),
});

export const companyMembershipRelations = relations(companyMembership, ({ one }) => ({
  company: one(company, {
    fields: [companyMembership.companyId],
    references: [company.id],
  }),
  user: one(user, {
    fields: [companyMembership.userId],
    references: [user.id],
  }),
}));

export type CompanyMembership = typeof companyMembership.$inferSelect;
export type CreateCompanyMembership = typeof companyMembership.$inferInsert;

export const CreateCompanyMembershipSchema = createInsertSchema(companyMembership);
export const SelectCompanyMembershipSchema = createSelectSchema(companyMembership);