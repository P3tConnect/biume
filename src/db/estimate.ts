import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { proSession } from "./pro_session";
import { relations } from "drizzle-orm";
import { estimateOptions } from "./estimateOptions";

export const estimate = pgTable("estimate", {
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

export const estimateRelations = relations(estimate, ({ one, many }) => ({
  session: one(proSession, {
    fields: [estimate.sessionId],
    references: [proSession.id],
  }),
  estimateOptions: many(estimateOptions),
}));
