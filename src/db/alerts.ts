import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { alertsTypes } from "./alertTypes";
import { company } from "./company";
import { user } from "./user";

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  description: text("description"),
  alertType: text("alertType").references(() => alertsTypes.id, {
    onDelete: "cascade",
  }),
  daysBefore: integer("daysBefore").notNull(),
  from: text("form").references(() => company.id, { onDelete: "cascade" }),
  to: text("to").references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});
