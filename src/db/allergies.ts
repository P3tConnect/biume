import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const allergies = pgTable("allergies", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});
