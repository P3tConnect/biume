"use client"

import { CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle } from "@/components/ui"
import React, { useState } from "react"
import { organization as organizationTable, progression as progressionTable } from "@/src/db"
import { organization as organizationUtil, updateUser, useSession } from "@/src/lib/auth-client"
import { useStepper, utils } from "../hooks/useStepper"

import ImagesStep from "../pro/images-step"
import IntroStep from "../pro/intro-step"
import ProDocumentsStep from "../pro/documents-step"
import ProInformationsStep from "../pro/informations-step"
import ProOptionsStep from "../pro/options-step"
import ProServicesStep from "../pro/services-step"
import StepIndicator from "./step-indicator"
import { SubscriptionStep } from "../pro/subscription-step"
import { db } from "@/src/lib"
import { eq } from "drizzle-orm"
import { generateMigrationName } from "@/src/lib/business-names"
import { toast } from "sonner"

const Stepper = () => {
  const { next, prev, current, goTo, all, isLast, switch: switchStep } = useStepper()
  const currentStep = utils.getIndex(current.id)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()

  const skipOnboarding = async () => {
    try {
      // Créer une organisation minimale
      setIsLoading(true)
      const name = generateMigrationName()

      // Créer directement avec l'API d'authentification
      const organizationResult = await organizationUtil.create({
        name: name,
        slug: name.toLowerCase().replace(/ /g, "-"),
        logo: "",
        metadata: {},
        userId: session?.user.id,
      })

      if (!organizationResult.data) {
        throw new Error("Impossible de créer l'organisation")
      }

      const organizationId = organizationResult.data.id

      // Créer une progression
      const [progression] = await db
        .insert(progressionTable)
        .values({
          docs: false,
          cancelPolicies: false,
          reminders: false,
          services: false,
        })
        .returning()

      // Définir l'organisation comme active
      await organizationUtil.setActive({
        organizationId: organizationId,
      })

      // Mettre à jour l'organisation dans la base de données
      await db
        .update(organizationTable)
        .set({
          onBoardingComplete: true,
          progressionId: progression.id,
        })
        .where(eq(organizationTable.id, organizationId))
        .execute()

      // Mettre à jour l'utilisateur comme pro
      await updateUser({
        isPro: true,
      })

      setIsLoading(false)

      // Rediriger vers le dashboard
      goTo("subscription")
      toast.success("Configuration rapide terminée !")
    } catch (error) {
      console.error("Erreur lors du skip:", error)

      // Afficher plus de détails sur l'erreur
      if (error instanceof Error) {
        console.error("Message d'erreur:", error.message)
        console.error("Stack trace:", error.stack)

        // Si l'erreur est liée à Stripe, proposer la page de configuration manuelle
        if (error.message.includes("Stripe") || error.message.toLowerCase().includes("stripe")) {
          toast.error(`Erreur: ${error.message}`, {
            description: (
              <div>
                <p>Veuillez réessayer plus tard ou contacter l&apos;assistance</p>
                <a href="/dashboard/stripe-setup" className="text-primary underline font-medium mt-2 block">
                  Configurer Stripe manuellement
                </a>
              </div>
            ),
            duration: 15000,
          })
        } else {
          toast.error(`Erreur: ${error.message}`, {
            description: "Veuillez réessayer plus tard ou contacter l'assistance",
            duration: 10000,
          })
        }
      } else {
        toast.error("Une erreur est survenue", {
          description: "Veuillez réessayer plus tard ou contacter l'assistance",
          duration: 5000,
        })
      }
      setIsLoading(false)
    }
  }

  return (
    <CredenzaContent className="max-w-4xl mx-auto w-full h-[700px] flex flex-col">
      <CredenzaHeader className="flex flex-row items-center space-x-4">
        <StepIndicator currentStep={currentStep + 1} totalSteps={all.length} isLast={isLast} />
        <div className="space-y-1 flex flex-col">
          <CredenzaTitle className="text-xl font-bold">{current.title}</CredenzaTitle>
          <CredenzaDescription className="text-muted-foreground text-md">{current.description}</CredenzaDescription>
        </div>
      </CredenzaHeader>

      <div className="flex-1 overflow-hidden">
        {switchStep({
          start: () => <IntroStep skipOnboarding={skipOnboarding} nextStep={next} isLoading={isLoading} />,
          informations: () => <ProInformationsStep nextStep={next} previousStep={prev} />,
          images: () => <ImagesStep nextStep={next} previousStep={prev} />,
          services: () => <ProServicesStep nextStep={next} previousStep={prev} />,
          options: () => <ProOptionsStep nextStep={next} previousStep={prev} />,
          documents: () => <ProDocumentsStep nextStep={next} previousStep={prev} />,
          subscription: () => <SubscriptionStep />,
        })}
      </div>
    </CredenzaContent>
  )
}

export default Stepper
