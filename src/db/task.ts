import { date, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";

export const task = pgTable("task", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  ownerId: text("ownerId").references(() => company.id, {
    onDelete: "cascade",
  }),
  description: text("description"),
  color: text("color"),
  location: text("location"),
  beginAt: date("beginAt"),
  endAt: date("endAt"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});
