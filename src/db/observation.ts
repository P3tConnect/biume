import { InferSelectModel, relations } from "drizzle-orm"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

import { Appointment, appointments } from "./appointments"

export const observation = pgTable("observations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const observationRelations = relations(observation, ({ one, many }) => ({
  appointment: one(appointments),
}))

export type Observation = InferSelectModel<typeof observation> & {
  appointment: Appointment
}
export type CreateObservation = typeof observation.$inferInsert

export const CreateObservationSchema = createInsertSchema(observation)
