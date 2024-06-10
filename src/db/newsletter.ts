import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";

export const newsletter = pgTable("newsletter", {
  id: serial("id").primaryKey(),
  redactor: text("redactor").references(() => company.id, {
    onDelete: "cascade",
  }),
  images: text("images").array(),
  title: text("title"),
  content: text("content"),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});
