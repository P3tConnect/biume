import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organization } from "./organization";

export const member = pgTable("member", {
  id: text("id").primaryKey(),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organization.id),
  userId: text("userId").notNull(),
  role: text("role").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});
