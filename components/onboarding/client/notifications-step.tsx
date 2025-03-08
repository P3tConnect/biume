"use client"

import React from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import ClientNotificationForm from "../components/client/notification-form"
import { clientOnBoardingSchema } from "../components/stepper-client"

const ClientNotificationStep = ({ form }: { form: UseFormReturn<z.infer<typeof clientOnBoardingSchema>> }) => {
  return <ClientNotificationForm form={form} />
}

export default ClientNotificationStep
