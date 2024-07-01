import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { alertsTypes } from "./alertTypes";
import { company } from "./company";
import { user } from "./user";
import { createInsertSchema } from "drizzle-zod";

export const alerts = pgTable("alerts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  description: text("description"),
  alertType: text("alertType").references(() => alertsTypes.id, {
    onDelete: "cascade",
  }),
  daysBefore: integer("daysBefore").notNull(),
  from: text("form").references(() => company.id, {
    onDelete: "cascade",
  }),
  to: text("to").references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const alertsRelations = relations(alerts, ({ one }) => ({
  alertType: one(alertsTypes, {
    fields: [alerts.alertType],
    references: [alertsTypes.id],
  }),
  from: one(user, {
    fields: [alerts.from],
    references: [user.id],
  }),
  to: one(user, {
    fields: [alerts.to],
    references: [user.id],
  }),
}));

export type Alert = typeof alerts.$inferSelect;

export type CreateAlert = typeof alerts.$inferInsert;

export const CreateAlertsSchema = createInsertSchema(alerts);
