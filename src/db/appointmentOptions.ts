import { pgTable, text } from "drizzle-orm/pg-core";
import { Appointment, appointments } from "./appointments";
import { Option, options } from "./options";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const appointmentOptions = pgTable("appointment_options", {
  appointmentId: text("appointmentId").references(() => appointments.id, {
    onDelete: "cascade",
  }),
  optionId: text("optionId").references(() => options.id, {
    onDelete: "cascade",
  }),
});

export const appointmentOptionsRelations = relations(appointmentOptions, ({ one }) => ({
  appointment: one(appointments, {
    fields: [appointmentOptions.appointmentId],
    references: [appointments.id],
  }),
  option: one(options, {
    fields: [appointmentOptions.optionId],
    references: [options.id],
  }),
}));

export type AppointmentOption = InferSelectModel<typeof appointmentOptions> & {
  appointment: Appointment;
  option: Option;
};
export type CreateAppointmentOption = typeof appointmentOptions.$inferInsert;

export const CreateAppointmentOptionSchema = createInsertSchema(appointmentOptions);
