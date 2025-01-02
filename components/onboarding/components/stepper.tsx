"use client";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";

import ClientCompleteStep from "../client/client-complete-step";
import ClientInformationsStep from "../client/informations-step";
import ClientNotificationStep from "../client/notifications-step";
import IntroStep from "../client/client-intro-step";
import ProCompleteStep from "../pro/complete-step";
import ProDocumentsStep from "../pro/documents-step";
import ProInformationsStep from "../pro/informations-step";
import ProOptionsStep from "../pro/options-step";
import ProServicesStep from "../pro/services-step";
import React from "react";
import StepIndicator from "./step-indicator";
import { useSession } from "@/src/lib/auth-client";
import { useStepper } from "../hooks/useStepper";
import { useStepper as useStepperClient } from "../hooks/useStepperClient";

const Stepper = ({ open }: { open: boolean }) => {
  const { data: session } = useSession();
  const stepperPro = useStepper();
  const stepperClient = useStepperClient();

  const stepper = session?.user.isPro ? stepperPro : stepperClient;

  return (
    <Dialog open={open}>
      <DialogContent className="w-[900px]">
        <DialogHeader className="flex flex-row items-center space-x-4">
          <StepIndicator
            currentStep={stepper.current.index + 1}
            totalSteps={stepper.all.length}
            isLast={stepper.isLast}
            size={100}
            strokeWidth={10}
          />
          <div className="space-y-1 flex flex-col">
            <DialogTitle>{stepper.current.title}</DialogTitle>
            <DialogDescription>{stepper.current.description}</DialogDescription>
          </div>
        </DialogHeader>
        {session?.user.isPro
          ? stepper.switch({
              start: () => <IntroStep />,
              informations: () => <ClientInformationsStep />,
              notifications: () => <ClientNotificationStep />,
              complete: () => <ClientCompleteStep />,
            })
          : stepper.switch({
              start: () => <IntroStep />,
              informations: () => <ClientInformationsStep />,
              notifications: () => <ClientNotificationStep />,
              complete: () => <ClientCompleteStep />,
            })}
        <div className="space-y-4">
          {!stepper.isLast ? (
            <div className="flex justify-end gap-4">
              {stepper.isFirst ? (
                <DialogClose asChild>
                  <Button variant="outline" className="rounded-xl">
                    Fermer
                  </Button>
                </DialogClose>
              ) : (
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={stepper.prev}
                  disabled={stepper.isFirst}
                >
                  Retour
                </Button>
              )}

              <Button onClick={stepper.next} className="rounded-xl">
                Suivant
              </Button>
            </div>
          ) : (
            <div className="flex flex-row justify-end gap-2">
              <Button
                onClick={stepper.prev}
                variant="outline"
                className="rounded-xl"
              >
                Retour
              </Button>
              <DialogClose asChild>
                <Button className="rounded-xl">Terminer</Button>
              </DialogClose>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Stepper;
