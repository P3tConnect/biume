"use client";

import {
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
import StepIndicator from "./step-indicator";
import IntroStep from "../pro/intro-step";
import {
  organization as organizationUtil,
  updateUser,
  useSession,
} from "@/src/lib/auth-client";
import {
  organization as organizationTable,
  progression as progressionTable,
} from "@/src/db";
import { db, stripe } from "@/src/lib";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { SubscriptionStep } from "../pro/subscription-step";
import { generateMigrationName } from "@/src/lib/business-names";

const Stepper = () => {
  const {
    next,
    prev,
    current,
    goTo,
    all,
    isLast,
    switch: switchStep,
  } = useStepper();
  const currentStep = utils.getIndex(current.id);
  const { data: session } = useSession();

  const skipOnboarding = async () => {
    try {
      // Créer une organisation minimale

      const name = generateMigrationName();

      const result = await organizationUtil.create({
        name: name,
        slug: name.toLowerCase().replace(/ /g, "-"),
        logo: "",
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
      const stripeCustomer = await stripe.customers.create({
        name: result.data?.name!,
        metadata: {
          organizationId: result.data?.id!,
        },
      });
      await db
        .update(organizationTable)
        .set({
          onBoardingComplete: true,
          progressionId: progression.id,
          stripeId: stripeCustomer.id,
        })
        .where(eq(organizationTable.id, result.data?.id as string))
        .execute();

      // Mettre à jour l'utilisateur comme pro
      await updateUser({
        isPro: true,
      });

      // Rediriger vers le dashboard
      goTo("subscription");
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
    <DialogContent
      className="w-[1200px]"
      onPointerDownOutside={(e) => {
        e.preventDefault();
      }}
      onEscapeKeyDown={(e) => {
        e.preventDefault();
      }}
    >
      <DialogHeader className="flex flex-row items-center space-x-4">
        <StepIndicator
          currentStep={currentStep + 1}
          totalSteps={all.length}
          isLast={isLast}
        />
        <div className="space-y-1 flex flex-col">
          <DialogTitle className="text-xl font-bold">
            {current.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-md">
            {current.description}
          </DialogDescription>
        </div>
      </DialogHeader>

      <div className="h-[700px] overflow-y-auto">
        {switchStep({
          start: () => (
            <IntroStep skipOnboarding={skipOnboarding} nextStep={next} />
          ),
          informations: () => (
            <ProInformationsStep nextStep={next} previousStep={prev} />
          ),
          services: () => (
            <ProServicesStep nextStep={next} previousStep={prev} />
          ),
          options: () => <ProOptionsStep nextStep={next} previousStep={prev} />,
          documents: () => (
            <ProDocumentsStep nextStep={next} previousStep={prev} />
          ),
          subscription: () => <SubscriptionStep />,
        })}
      </div>
    </DialogContent>
  );
};

export default Stepper;
