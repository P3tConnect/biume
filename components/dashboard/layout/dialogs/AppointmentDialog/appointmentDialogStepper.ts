import { defineStepper } from "@stepperize/react";
import { z } from "zod";

export const clientStepSchema = z.object({
  clientId: z.string().min(1),
  patientId: z.string().min(1),
});

export const serviceStepSchema = z.object({
  serviceId: z.string().min(1),
  duration: z.number().min(1),
});

export const dateStepSchema = z.object({
  date: z.date(),
  startTime: z.string().min(1),
  duration: z.number().min(1),
});

export const confirmationStepSchema = z.object({
  atHome: z.boolean(),
  notes: z.string().min(1),
});

export type ClientStepSchema = z.infer<typeof clientStepSchema>;
export type ServiceStepSchema = z.infer<typeof serviceStepSchema>;
export type DateStepSchema = z.infer<typeof dateStepSchema>;
export type ConfirmationStepSchema = z.infer<typeof confirmationStepSchema>;

const { useStepper, utils } = defineStepper(
  {
    id: "client",
    label: "Client",
    description: "Sélectionnez le client",
    schema: clientStepSchema,
  },
  {
    id: "service",
    label: "Service",
    description: "Sélectionnez le service",
    schema: serviceStepSchema,
  },
  {
    id: "date",
    label: "Date",
    description: "Sélectionnez la date",
    schema: dateStepSchema,
  },
  {
    id: "confirmation",
    label: "Confirmation",
    description: "Confirmez le rendez-vous",
    schema: confirmationStepSchema,
  },
);

export { useStepper, utils };
