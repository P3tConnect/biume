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
import React from "react";
import { useStepper, utils } from "../hooks/useStepperClient";
import StepIndicator from "./step-indicator";
import ClientIntroStep from "../client/client-intro-step";
import ClientNotificationStep from "../client/notifications-step";
import ClientCompleteStep from "../client/client-complete-step";
import ClientInformationsStep from "../client/informations-step";
import { updateUser, useSession } from "@/src/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const StepperClient = ({ open }: { open: boolean }) => {
  const { data: session } = useSession();
  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);

  const form = useForm<z.infer<typeof clientOnBoardingSchema>>({
    resolver: zodResolver(clientOnBoardingSchema),
    defaultValues: {
      image: "",
      address: "",
      city: "",
      country: "",
      zipCode: "",
      phoneNumber: "",
      smsNotifications: false,
      emailNotifications: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof clientOnBoardingSchema>) => {
    if (stepper.current.id == "start") {
      stepper.next();
    }

    if (stepper.current.id == "informations") {
      await updateUser({
        image: data.image,
        address: data.address,
        city: data.city,
        country: data.country,
        zipCode: data.zipCode,
        phoneNumber: data.phoneNumber,
      });
      stepper.next();
    }

    if (stepper.current.id == "notifications") {
      await updateUser({
        smsNotifications: data.smsNotifications,
        emailNotifications: data.emailNotifications,
      });
      stepper.next();
    }

    if (stepper.current.id == "complete") {
      await updateUser({
        onBoardingComplete: true,
      });
      stepper.reset();
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-[900px]">
        <DialogHeader className="flex flex-row items-center space-x-4">
          <StepIndicator
            currentStep={currentIndex}
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
        {session?.user.isPro === false &&
          stepper.switch({
            start: () => <ClientIntroStep />,
            informations: () => <ClientInformationsStep form={form} />,
            notifications: () => <ClientNotificationStep form={form} />,
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

              <Button
                onClick={async () => await onSubmit(form.getValues())}
                className="rounded-xl"
              >
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
                <Button
                  className="rounded-xl"
                  onClick={async () => await onSubmit(form.getValues())}
                >
                  Terminer
                </Button>
              </DialogClose>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const clientOnBoardingSchema = z.object({
  image: z.string().url().optional(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string(),
  phoneNumber: z.string(),
  emailNotifications: z.boolean().default(false),
  smsNotifications: z.boolean().default(false),
});

export default StepperClient;
