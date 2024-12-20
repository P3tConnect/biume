"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import React from "react";
import { useStepper } from "../hooks/useStepper";
import ProInformationsStep from "../pro/informations-step";
import ProServicesStep from "../pro/services-step";
import ProOptionsStep from "../pro/options-step";
import ProDocumentsStep from "../pro/documents-step";
import ProCompleteStep from "../pro/complete-step";

const Stepper = ({ open }: {open: boolean}) => {
  const stepper = useStepper();

  return (
    <Dialog open={open}>
      <DialogHeader>
        <DialogTitle>{stepper.current.title}</DialogTitle>
        <DialogDescription>{stepper.current.description}</DialogDescription>
      </DialogHeader>
      <DialogContent>
        {stepper.switch({
          informations: () => <ProInformationsStep />,
          services: () => <ProServicesStep />,
          options: () => <ProOptionsStep />,
          documents: () => <ProDocumentsStep />,
          complete: () => <ProCompleteStep />, 
        })}
      </DialogContent>
    </Dialog>
  );
};

export default Stepper;
