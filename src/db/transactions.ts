import { relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const transaction = pgTable("transaction", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  amount: integer("amount").notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  // refId: text("refId").references(() => ),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const transactionRelations = relations(
  transaction,
  ({ one, many }) => ({}),
);

export type Transaction = typeof transaction.$inferSelect;
export type CreateTransaction = typeof transaction.$inferInsert;

export const CreateTransactionSchema = createInsertSchema(transaction);
