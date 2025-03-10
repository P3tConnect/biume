"use client"

import {
  Button,
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui"
import { updateUser, useSession } from "@/src/lib/auth-client"
import { useStepper, utils } from "../hooks/useStepperClient"

import ClientCompleteStep from "../client/client-complete-step"
import ClientInformationsStep from "../client/informations-step"
import ClientIntroStep from "../client/client-intro-step"
import ClientNotificationStep from "../client/notifications-step"
import InformationsPetAllergiesStep from "@/components/dashboard/pages/user/pets-page/components/informations-pet-allergies-step"
import InformationsPetDeseasesStep from "@/components/dashboard/pages/user/pets-page/components/informations-pet-deseases-step"
import InformationsPetForm from "@/components/dashboard/pages/user/pets-page/forms/informations-pet-form"
import InformationsPetIntolerancesStep from "@/components/dashboard/pages/user/pets-page/components/informations-pet-intolerances-step"
import { PetProvider } from "@/components/dashboard/pages/user/pets-page/context/pet-context"
import React from "react"
import StepIndicator from "./step-indicator"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const StepperClient = ({ open }: { open: boolean }) => {
  const { data: session } = useSession()
  const stepper = useStepper()
  const currentIndex = utils.getIndex(stepper.current.id)

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
  })

  const onSubmit = async (data: z.infer<typeof clientOnBoardingSchema>) => {
    if (stepper.current.id == "start") {
      stepper.next()
      return
    }

    if (stepper.current.id == "informations") {
      const isValid = await form.trigger(["address", "city", "country", "zipCode", "phoneNumber"])

      if (!isValid) {
        return
      }

      await updateUser({
        image: data.image,
        address: data.address,
        city: data.city,
        country: data.country,
        zipCode: data.zipCode,
        phoneNumber: data.phoneNumber,
      })
      stepper.next()
      return
    }

    if (stepper.current.id == "notifications") {
      await updateUser({
        smsNotifications: data.smsNotifications,
        emailNotifications: data.emailNotifications,
      })
      stepper.next()
      return
    }

    if (stepper.current.id == "complete") {
      await updateUser({
        onBoardingComplete: true,
      })
    }
  }

  return (
    <Credenza open={open}>
      <CredenzaContent className="w-[900px]">
        <CredenzaHeader className="flex flex-row items-center space-x-4">
          <StepIndicator
            currentStep={currentIndex + 1}
            totalSteps={stepper.all.length}
            isLast={stepper.isLast}
            size={100}
            strokeWidth={10}
          />
          <div className="space-y-1 flex flex-col">
            <CredenzaTitle>{stepper.current.title}</CredenzaTitle>
            <CredenzaDescription>{stepper.current.description}</CredenzaDescription>
          </div>
        </CredenzaHeader>
        {session?.user.isPro === false &&
          stepper.switch({
            start: () => <ClientIntroStep />,
            informations: () => <ClientInformationsStep form={form} />,
            notifications: () => <ClientNotificationStep form={form} />,
            pet: () => (
              <PetProvider>
                <InformationsPetForm nextStep={() => stepper.next()} />
              </PetProvider>
            ),
            petDeseases: () => (
              <PetProvider>
                <InformationsPetDeseasesStep
                  nextStep={() => stepper.next()}
                  previousStep={() => stepper.prev()}
                  isPending={false}
                />
              </PetProvider>
            ),
            petIntolerances: () => (
              <PetProvider>
                <InformationsPetIntolerancesStep
                  nextStep={() => stepper.next()}
                  previousStep={() => stepper.prev()}
                  isPending={false}
                />
              </PetProvider>
            ),
            petAllergies: () => (
              <PetProvider>
                <InformationsPetAllergiesStep
                  nextStep={() => stepper.next()}
                  previousStep={() => stepper.prev()}
                  isPending={false}
                />
              </PetProvider>
            ),
            complete: () => <ClientCompleteStep />,
          })}
        {stepper.current.id === "pet" ||
        stepper.current.id === "petDeseases" ||
        stepper.current.id === "petIntolerances" ||
        stepper.current.id === "petAllergies" ? (
          <></>
        ) : (
          <div className="space-y-4">
            {!stepper.isLast ? (
              <div className="flex justify-end gap-4">
                {stepper.isFirst ? (
                  <CredenzaClose asChild>
                    <Button variant="outline" className="rounded-xl">
                      Fermer
                    </Button>
                  </CredenzaClose>
                ) : (
                  <Button variant="outline" className="rounded-xl" onClick={stepper.prev} disabled={stepper.isFirst}>
                    Retour
                  </Button>
                )}
                <Button
                  onClick={async () => await onSubmit(form.getValues())}
                  className="rounded-xl"
                  disabled={
                    stepper.current.id === "informations" &&
                    (!form.getValues().address ||
                      !form.getValues().city ||
                      !form.getValues().country ||
                      !form.getValues().zipCode ||
                      !form.getValues().phoneNumber)
                  }
                >
                  Suivant
                </Button>
              </div>
            ) : (
              <div className="flex flex-row justify-end gap-2">
                <Button onClick={stepper.prev} variant="outline" className="rounded-xl">
                  Retour
                </Button>
                <CredenzaClose asChild>
                  <Button className="rounded-xl" onClick={async () => await onSubmit(form.getValues())}>
                    Terminer
                  </Button>
                </CredenzaClose>
              </div>
            )}
          </div>
        )}
      </CredenzaContent>
    </Credenza>
  )
}

export const clientOnBoardingSchema = z.object({
  image: z.string().optional(),
  address: z.string().min(1, "Votre adresse doit contenie le numéro de votre rue ainsi que le nom de la rue"),
  country: z.string().min(1, "Le pays doit être valide"),
  city: z.string().min(1, "Votre ville doit être valide"),
  zipCode: z.string().min(5, "Votre code postal doit être valide, soit 5 chiffres"),
  phoneNumber: z.string().min(10, "Votre numéro doit comprendre que 10 chiffres"),
  emailNotifications: z.boolean().default(false).optional(),
  smsNotifications: z.boolean().default(false).optional(),
  pet: z
    .object({
      image: z.string().optional(),
      name: z.string(),
      breed: z.string(),
      age: z.string(),
      gender: z.string(),
      type: z.string(),
      weight: z.number(),
      height: z.number(),
      description: z.string().optional(),
      deseases: z.array(z.string()).optional(),
      intolerances: z.array(z.string()).optional(),
      allergies: z.array(z.string()).optional(),
    })
    .optional(),
})

export default StepperClient
