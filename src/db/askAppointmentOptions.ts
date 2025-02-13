import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { AskAppointment, askAppointment } from "./askAppointment";
import { Option, options } from "./options";
import { createInsertSchema } from "drizzle-zod";

export const askAppointmentOptions = pgTable("ask_appointment_options", {
  askAppointmentId: text("askAppointmentId").references(
    () => askAppointment.id,
    {
      onDelete: "cascade",
    },
  ),
  optionId: text("optionId").references(() => options.id, {
    onDelete: "cascade",
  }),
});

export const askAppointmentOptionsRelations = relations(
  askAppointmentOptions,
  ({ one }) => ({
    askAppointment: one(askAppointment, {
      fields: [askAppointmentOptions.askAppointmentId],
      references: [askAppointment.id],
    }),
    option: one(options, {
      fields: [askAppointmentOptions.optionId],
      references: [options.id],
    }),
  }),
);

export type AskAppointmentOption = InferSelectModel<
  typeof askAppointmentOptions
> & {
  askAppointment: AskAppointment;
  option: Option;
};
export type CreateAskAppointmentOption =
  typeof askAppointmentOptions.$inferInsert;

export const CreateAskAppointmentOptionSchema = createInsertSchema(
  askAppointmentOptions,
);
