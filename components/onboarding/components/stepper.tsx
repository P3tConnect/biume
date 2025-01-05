"use client";

import {
  Button,
  DialogClose,
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
import StepIndicator from "./step-indicator";
import IntroStep from "../pro/intro-step";
import { organization as organizationUtil, useActiveOrganization, useSession } from "@/src/lib/auth-client";
import { z } from "zod";
import { db } from "@/src/lib";
import { CreateOptionSchema, CreateServiceSchema, organizationDocuments } from "@/src/db";

const Stepper = ({ open }: { open: boolean }) => {
  const stepper = useStepper();
  const { data: session } = useSession();

  const onSubmit = async (data: z.infer<typeof onboardingSchema>) => {
    switch (stepper.current.id) {
      case "informations":
        const result = await organizationUtil.create({
          name: data.name as string,
          slug: data.name?.toLowerCase().replace(/\s+/g, "-") as string,
          logo: data.logo,
          metadata: {},
          userId: session?.user.id,
        });
        await organizationUtil.setActive({
          organizationId: result.data?.id,
        });
        stepper.next();
        break;
      case "documents":
        const { data: organization } = useActiveOrganization();

        stepper.next();
        break;
      case "services":
        stepper.next();
        break;
      case "options":
        stepper.next();
      default:
        return;
    }
  }

  return (
    <DialogContent className="w-[900px]">
      <DialogHeader className="flex flex-row items-center space-x-4">
        <StepIndicator currentStep={stepper.current.index + 1} totalSteps={stepper.all.length} isLast={stepper.isLast} />
        <div className="space-y-1 flex flex-col">
          <DialogTitle>{stepper.current.title}</DialogTitle>
          <DialogDescription>{stepper.current.description}</DialogDescription>
        </div>
      </DialogHeader>

      {stepper.switch({
        start: () => <IntroStep />,
        informations: () => <ProInformationsStep />,
        services: () => <ProServicesStep />,
        options: () => <ProOptionsStep />,
        documents: () => <ProDocumentsStep />,
        complete: () => <ProCompleteStep />,
      })}
      <div className="space-y-4">
        {!stepper.isLast ? (
          <div className="flex justify-end gap-4">
            {stepper.isFirst ? (
              <DialogClose asChild>
                <Button variant="outline" className="rounded-xl">Fermer</Button>
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
            <Button onClick={stepper.prev} variant="outline" className="rounded-xl">Retour</Button>
            <DialogClose asChild>
              <Button className="rounded-xl">Terminer</Button>
            </DialogClose>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

const onboardingSchema = z.object({
  name: z.string().optional(),
  logo: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  description: z.string().optional(),
  services: z.array(CreateServiceSchema).optional(),
  options: z.array(CreateOptionSchema).optional(),
  documents: z.array(z.instanceof(File)).optional(),
  siren: z.string().min(9).max(9).optional(),
});

export default Stepper;
