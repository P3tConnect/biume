import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { company } from "./company";

export const intolerences = pgTable("intolerences", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title"),
  description: text("description"),
  ownerId: text("ownerId").references(() => company.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const intolerencesRelations = relations(intolerences, ({ one }) => ({
  owner: one(company),
}));
