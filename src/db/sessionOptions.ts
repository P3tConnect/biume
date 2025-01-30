import { pgTable, text } from "drizzle-orm/pg-core";
import { appointments } from "./appointments";
import { options } from "./options";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const sessionOptions = pgTable("session_options", {
  appointmentId: text("appointmentId").references(() => appointments.id, {
    onDelete: "cascade",
  }),
  optionId: text("optionId").references(() => options.id, {
    onDelete: "cascade",
  }),
});

export const sessionOptionsRelations = relations(sessionOptions, ({ one }) => ({
  appointment: one(appointments, {
    fields: [sessionOptions.appointmentId],
    references: [appointments.id],
  }),
  option: one(options, {
    fields: [sessionOptions.optionId],
    references: [options.id],
  }),
}));

export type SessionOption = typeof sessionOptions.$inferSelect;
export type CreateSessionOption = typeof sessionOptions.$inferInsert;

export const CreateSessionOptionSchema = createInsertSchema(sessionOptions);
