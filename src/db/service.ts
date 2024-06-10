import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";

export const service = pgTable("service", {
  id: serial("id").primaryKey(),
  image: text("image"),
  name: text("name"),
  description: text("description"),
  price: integer("price"),
  proId: text("proId").references(() => company.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});
