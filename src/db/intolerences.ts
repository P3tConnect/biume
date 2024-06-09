import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const intolerences = pgTable("intolerences", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  ownerId: text("ownerId").references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});
