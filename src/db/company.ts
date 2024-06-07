import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const company = pgTable("company", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  coverImage: text("coverImage"),
  description: text("description"),
  address: text("address").notNull(),
  email: text("email").notNull().unique(),
  ownerId: text("ownerId").references(() => user.id, { onDelete: "cascade" }),
  siret: text("siret").notNull(),
  siren: text("siren").notNull(),
  atHome: boolean("atHome").notNull(),
  nac: text("nac"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
});
