import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { invoiceOptions } from "./invoiceOptions";
import { createInsertSchema } from "drizzle-zod";
import { askEstimate } from "./ask_estimate";
import { proSession } from "./pro_session";

export const invoice = pgTable("invoice", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  total: integer("total"),
  sessionId: text("sessionId").references(() => proSession.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
  options: many(invoiceOptions),
  session: one(proSession, {
    fields: [invoice.sessionId],
    references: [proSession.id],
  }),
}));

export type Invoice = typeof invoice.$inferSelect;
export type CreateInvoice = typeof invoice.$inferInsert;

export const CreateInvoiceSchema = createInsertSchema(invoice);
