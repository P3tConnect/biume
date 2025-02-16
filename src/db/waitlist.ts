import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  firstName: text("firstname").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  organizationName: text("organization_name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

