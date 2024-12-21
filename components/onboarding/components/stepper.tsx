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
import { currentUser } from "@/src/lib";
import ClientInformationsPage from "@/app/(main)/onboarding/@client/informations/page";
import ClientNotificationsPage from "@/app/(main)/onboarding/@client/notifications/page";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

const Stepper = async ({ open }: { open: boolean }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const stepper = useStepper();

  return (
    <Dialog open={open}>
      <DialogHeader>
        <DialogTitle>{stepper.current.title}</DialogTitle>
        <DialogDescription>{stepper.current.description}</DialogDescription>
      </DialogHeader>
      <DialogContent>
        {session?.user.isPro ? (
        {stepper.switch({
          informations: () => <ProInformationsStep />,
          services: () => <ProServicesStep />,
          options: () => <ProOptionsStep />,
          documents: () => <ProDocumentsStep />,
          complete: () => <ProCompleteStep />,
        })}) : (
          stepperClient.switch ({})
        )
      </DialogContent>
    </Dialog>
  );
};

export default Stepper;
