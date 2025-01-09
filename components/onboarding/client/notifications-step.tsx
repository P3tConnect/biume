"use client";

import ClientNotificationForm from "../components/client/notification-form";
import React from "react";
import { clientOnBoardingSchema } from "../components/stepper-client";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const ClientNotificationStep = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof clientOnBoardingSchema>>;
}) => {
  return <ClientNotificationForm form={form} />;
};

export default ClientNotificationStep;
