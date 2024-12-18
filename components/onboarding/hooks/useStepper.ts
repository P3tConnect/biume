import { defineStepper } from "@stepperize/react";
import { z } from "zod";

export const { steps, useStepper } = defineStepper(
  {
    id: "informations",
    title: "Informations",
    description: "",
    schema: z.object({})
  },
  {
    id: "services",
    title: "Services",
    description: "",
    schema: z.object({})
  },
  {
    id: "options",
    title: "Options",
    description: "",
    schema: z.object({})
  },
  {
    id: "documents",
    title: "Documents",
    description: "",
    schema: z.object({})
  },
  {
    id: "complete",
    title: "Complete",
    description: "",
  }
);