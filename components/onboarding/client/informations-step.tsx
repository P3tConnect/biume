"use client";

import ClientInformationForm from "@/components/onboarding/components/client/information-form";
import React from "react";
import { clientOnBoardingSchema } from "../components/stepper-client";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

const ClientInformationsStep = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof clientOnBoardingSchema>>;
}) => {
  return <ClientInformationForm form={form} />;
};

export default ClientInformationsStep;
