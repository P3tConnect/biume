import { defineStepper } from "@stepperize/react"

export const useCreateInvoiceStepper = defineStepper(
  {
    id: "clients",
    label: "Clients",
  },
  {
    id: "services",
    label: "Services",
  },
  {
    id: "options",
    label: "Options",
  },
  {
    id: "summary",
    label: "Récapitulatif",
  }
)
