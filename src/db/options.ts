import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { relations } from "drizzle-orm";
import { askEstimateOptions } from "./askEstimateOptions";
import { invoiceOptions } from "./invoiceOptions";
import { sessionOptions } from "./sessionOptions";
import { createInsertSchema } from "drizzle-zod";
import { organization } from "./organization";

export const options = pgTable("options", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const optionsRelations = relations(options, ({ one, many }) => ({
  askEstimates: many(askEstimateOptions),
  invoices: many(invoiceOptions),
  sessions: many(sessionOptions),
  organization: one(organization, {
    fields: [options.organizationId],
    references: [organization.id],
  }),
}));

export type Option = typeof options.$inferSelect;
export type CreateOption = typeof options.$inferInsert;

export const CreateOptionSchema = createInsertSchema(options);
