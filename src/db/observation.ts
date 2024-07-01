import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { proSession } from "./pro_session";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const observation = pgTable("observations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const observationRelations = relations(observation, ({ one, many }) => ({
  session: one(proSession),
}));

export type Observation = typeof observation.$inferSelect;
export type CreateObservation = typeof observation.$inferInsert;

export const CreateObservationSchema = createInsertSchema(observation);
