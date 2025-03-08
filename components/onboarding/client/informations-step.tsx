"use client"

import React from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import ClientInformationForm from "@/components/onboarding/components/client/information-form"

import { clientOnBoardingSchema } from "../components/stepper-client"

const ClientInformationsStep = ({ form }: { form: UseFormReturn<z.infer<typeof clientOnBoardingSchema>> }) => {
  return <ClientInformationForm form={form} />
}

export default ClientInformationsStep
