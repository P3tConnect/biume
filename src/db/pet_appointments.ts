import { pgTable, text } from "drizzle-orm/pg-core";
import { Pet, pets } from "./pets";
import { Appointment, appointments } from "./appointments";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const petAppointments = pgTable("pet_appointments", {
  petId: text("petId").references(() => pets.id, { onDelete: "cascade" }),
  appointmentId: text("appointmentId").references(() => appointments.id, {
    onDelete: "cascade",
  }),
});

export const petAppointmentsRelations = relations(petAppointments, ({ one }) => ({
  pet: one(pets, {
    fields: [petAppointments.petId],
    references: [pets.id],
  }),
  appointment: one(appointments, {
    fields: [petAppointments.appointmentId],
    references: [appointments.id],
  }),
}));

export type PetAppointment = InferSelectModel<typeof petAppointments> & {
  pet: Pet
  appointment: Appointment
}
export type CreatePetAppointment = typeof petAppointments.$inferInsert

export const petAppointmentsSchema = createInsertSchema(petAppointments)
export const petAppointmentsSelectSchema = createSelectSchema(petAppointments)
