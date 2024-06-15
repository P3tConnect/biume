import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { pets } from "./pets";
import { employeeCompany } from "./employeeCompany";
import { ratings } from "./ratings";
import { projectsInvitees } from "./projectsInvitees";

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

export const plan = pgEnum("plan", ["BASIC", "PREMIUM", "ULTIMATE", "NONE"]);

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
  plan: plan("plan").default("NONE"),
  role: role("role").default("CLIENT"),
  isPro: boolean("isPro").default(false),
});

export const userRelations = relations(user, ({ many }) => ({
  pets: many(pets),
  employeeOf: many(employeeCompany),
  ratingsAuthor: many(ratings),
  projectInvitees: many(projectsInvitees),
}));
