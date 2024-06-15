import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { relations } from "drizzle-orm";
import { alerts } from "./alerts";

export const alertsTypes = pgTable("alerts_types", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title"),
  description: text("description"),
  color: text("color"),
  ownerId: text("ownerId").references(() => company.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});

export const alertTypesRelations = relations(alertsTypes, ({ one, many }) => ({
  owner: one(company, {
    fields: [alertsTypes.ownerId],
    references: [company.id],
  }),
  alert: one(alerts),
}));
