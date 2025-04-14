import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { organization } from "./organization"

export const prescription = pgTable("prescription", {
  id: text("id").primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
  createdBy: text("createdBy").references(() => organization.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
})
