import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { company } from "./company";

export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  rate: integer("rate").notNull(),
  comment: text("comment"),
  proId: text("proId").references(() => company.id, { onDelete: "cascade" }),
  isRecommanded: boolean("isRecommanded").default(false).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});
