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
import { useStepper as useStepperClient } from "../hooks/useStepperClient";
import ProInformationsStep from "../pro/informations-step";
import ProServicesStep from "../pro/services-step";
import ProOptionsStep from "../pro/options-step";
import ProDocumentsStep from "../pro/documents-step";
import ProCompleteStep from "../pro/complete-step";
import { useSession } from "@/src/lib/auth-client";
import ClientNotificationStep from "../client/notifications-step";
import ClientInformationsStep from "../client/informations-step";

const Stepper = ({ open }: { open: boolean }) => {
  const { data: session } = useSession();
  const stepper = useStepper();
  const stepperClient = useStepperClient();

  return (
    <Dialog open={open}>
      <DialogHeader>
        <DialogTitle>{stepper.current.title}</DialogTitle>
        <DialogDescription>{stepper.current.description}</DialogDescription>
      </DialogHeader>
      <DialogContent>
        {session?.user.isPro
          ? stepper.switch({
              informations: () => <ProInformationsStep />,
              services: () => <ProServicesStep />,
              options: () => <ProOptionsStep />,
              documents: () => <ProDocumentsStep />,
              complete: () => <ProCompleteStep />,
            })
          : stepperClient.switch({
              informations: () => <ClientInformationsStep />,
              notifications: () => <ClientNotificationStep />,
            })}
      </DialogContent>
    </Dialog>
  );
};

export default Stepper;
