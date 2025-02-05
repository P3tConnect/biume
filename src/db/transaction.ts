import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { organization } from "./organization";

export const transaction = pgTable("transaction", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  amount: integer("amount").notNull(),
  from: text("from").notNull(),
  to: text("to").references(() => organization.id, {
    onDelete: "cascade",
  }),
  status: text("status").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const transactionRelations = relations(transaction, ({ one }) => ({
  from: one(organization, {
    fields: [transaction.from],
    references: [organization.id],
  }),
}));

export type Transaction = InferSelectModel<typeof transaction> & {
  from: InferSelectModel<typeof organization>;
};
export type CreateTransaction = typeof transaction.$inferInsert;

export const CreateTransactionSchema = createInsertSchema(transaction);
