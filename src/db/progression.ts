import { relations } from "drizzle-orm";
import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { company } from "./company";

export const progression = pgTable("progression", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  docs: boolean("docs").default(false),
  cancelPolicies: boolean("cancelPolicies").default(false),
  reminders: boolean("reminders").default(false),
  services: boolean("services").default(false),
});

export const progressionRelations = relations(progression, ({ one, many }) => ({
  company: one(company),
}));
