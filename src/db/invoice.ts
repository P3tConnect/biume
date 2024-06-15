import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { proSession } from "./pro_session";
import { relations } from "drizzle-orm";
import { invoiceOptions } from "./invoiceOptions";
import { sessions } from "./session";

export const invoice = pgTable("invoice", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  sessionId: text("sessionId").references(() => proSession.id, {
    onDelete: "cascade",
  }),
  total: integer("total"),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
  invoiceOptions: many(invoiceOptions),
  session: one(proSession, {
    fields: [invoice.sessionId],
    references: [proSession.id],
  }),
}));
