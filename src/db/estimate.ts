import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { pro_session } from "./pro_session";
import { relations } from "drizzle-orm";

export const estimate = pgTable("estimate", {
  id: serial("id").primaryKey(),
  sessionId: text("sessionId").references(() => pro_session.id, {
    onDelete: "cascade",
  }),
  total: integer("total"),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const estimateRelations = relations(estimate, ({ one, many }) => ({}));
