import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";

export const role = pgEnum("role", [
  "CLIENT",
  "COMMUNICATION",
  "VETERINARY",
  "OSTEOPATH",
  "NATUROPATH",
  "EDUCATOR",
  "COMPORTEMENTALIST",
  "TOILLETEUR",
  "MASSEUR",
]);

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  phone: text("phone"),
  address: text("address").notNull(),
  plan: text("plan"),
  role: role("role").default("CLIENT"),
  isPro: boolean("isPro").default(false),
});
