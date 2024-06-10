import {
  boolean,
  date,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { company } from "./company";

export const project = pgTable("project", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  ownerId: text("ownerId").references(() => company.id, {
    onDelete: "cascade",
  }),
  color: text("color"),
  location: text("location"),
  beginAt: date("beginAt").notNull(),
  endAt: date("endAt").notNull(),
  isImportant: boolean("isImportant").default(false),
  note: text("note"),
  link: text("link"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});
