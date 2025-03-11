import { InferSelectModel, relations } from "drizzle-orm"
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

import { Organization, organization } from "./organization"
import { User, user } from "./user"

export const transaction = pgTable("transaction", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  intentId: text("intentId"),
  amount: integer("amount"),
  from: text("from").references(() => user.id, {
    onDelete: "cascade",
  }),
  to: text("to").references(() => organization.id, {
    onDelete: "cascade",
  }),
  status: text("status").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const transactionRelations = relations(transaction, ({ one }) => ({
  from: one(user, {
    fields: [transaction.from],
    references: [user.id],
  }),
  to: one(organization, {
    fields: [transaction.to],
    references: [organization.id],
  }),
}))

export type Transaction = InferSelectModel<typeof transaction> & {
  from: User
  to: Organization
}
export type CreateTransaction = typeof transaction.$inferInsert

export const CreateTransactionSchema = createInsertSchema(transaction)
