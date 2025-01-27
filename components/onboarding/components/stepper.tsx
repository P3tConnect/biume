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
import { useStepper, utils } from "../hooks/useStepper";
import ProInformationsStep from "../pro/informations-step";
import ProServicesStep from "../pro/services-step";
import ProOptionsStep from "../pro/options-step";
import ProDocumentsStep from "../pro/documents-step";
import ProCompleteStep from "../pro/complete-step";
import StepIndicator from "./step-indicator";
import IntroStep from "../pro/intro-step";
import {
  organization as organizationUtil,
  updateUser,
  useSession,
} from "@/src/lib/auth-client";
import { z } from "zod";
import {
  CreateOptionSchema,
  CreateServiceSchema,
  organizationDocuments,
  service,
  options as optionsTable,
  organization as organizationTable,
  progression as progressionTable,
} from "@/src/db";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { db, stripe } from "@/src/lib";
import { useRouter } from "next/navigation";
import { eq } from "drizzle-orm";
import { toast, Toaster } from "sonner";
import { onboardingSchema } from "../types/onboarding-schemas";
import { proInformationsSchema, proServicesSchema, proDocumentsSchema, proOptionsSchema } from "../types/onboarding-schemas";

const Stepper = () => {
  const stepper = useStepper();
  const currentStep = utils.getIndex(stepper.current.id);
  const { data: session } = useSession();
  const router = useRouter();

  const skipOnboarding = async () => {
    try {
      // Créer une organisation minimale
      const result = await organizationUtil.create({
        name: "Mon entreprise",
        slug: "mon-entreprise",
        metadata: {},
        userId: session?.user.id,
      });

      // Créer une progression
      const [progression] = await db
        .insert(progressionTable)
        .values({
          docs: false,
          cancelPolicies: false,
          reminders: false,
          services: false,
        })
        .returning();

      // Définir l'organisation comme active
      await organizationUtil.setActive({
        organizationId: result.data?.id!,
      });

      // Marquer l'onboarding comme terminé et ajouter la progression
      await db
        .update(organizationTable)
        .set({
          onBoardingComplete: true,
          progressionId: progression.id,
        })
        .where(eq(organizationTable.id, result.data?.id as string))
        .execute();

      // Mettre à jour l'utilisateur comme pro
      await updateUser({
        isPro: true,
      });

      // Rediriger vers le dashboard
      router.push(`/dashboard/organization/${result.data?.id}`);
      toast.success("Configuration rapide terminée !");
    } catch (error) {
      console.error("Erreur lors du skip:", error);
      toast.error("Une erreur est survenue", {
        description: "Veuillez réessayer plus tard",
        duration: 5000,
      });
    }
  };

  return (
    <DialogContent className="w-[1000px]">
      <DialogHeader className="flex flex-row items-center space-x-4">
        <StepIndicator
          currentStep={currentStep + 1}
          totalSteps={stepper.all.length}
          isLast={stepper.isLast}
        />
        <div className="space-y-1 flex flex-col">
          <DialogTitle>{stepper.current.title}</DialogTitle>
          <DialogDescription>{stepper.current.description}</DialogDescription>
        </div>
      </DialogHeader>

      <div className="h-[500px] overflow-y-auto p-4">
        {stepper.switch({
          start: () => <IntroStep skipOnboarding={skipOnboarding} nextStep={stepper.next} />,
          informations: () => <ProInformationsStep />,
          services: () => <ProServicesStep />,
          options: () => <ProOptionsStep />,
          documents: () => <ProDocumentsStep />,
          complete: () => <ProCompleteStep />,
        })}
      </div>
    </DialogContent>
  );
};



export default Stepper;
