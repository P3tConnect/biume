import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";

export const alertsTypes = pgTable("alerts_types", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  color: text("color"),
  ownerId: text("ownerId").references(() => company.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});
