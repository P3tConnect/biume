import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const advancedReport = pgTable("advancedReport", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})