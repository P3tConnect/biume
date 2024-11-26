import { boolean, date, pgEnum } from "drizzle-orm/pg-core";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const sexeEnum = pgEnum("sexe", ["masculin", "féminin"]);

// Define the users table
export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  firstname: varchar("firstname", { length: 255 }).notNull(),
  lastname: varchar("lastname", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 10 }).notNull(),
  birthday: date("birthday").notNull(),
  sexe: sexeEnum("sexe").notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  zipcode: varchar("zipcode", { length: 20 }).notNull(),
  address: text("address").notNull(),
  profilImage: text("profilImage"),
  smsNotification: boolean("smsNotification").notNull().default(false),
  emailNotification: boolean("emailNotification").notNull().default(false),
});

// Define the schema for inserting users
export const CreateUserSchema = createInsertSchema(users);

export type User = typeof users.$inferSelect;
export type CreateUser = typeof users.$inferInsert;
