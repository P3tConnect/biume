"use client";

import React from "react";
import { useSession } from "@/src/lib/auth-client";
import StepperClient from "@/components/onboarding/components/stepper-client";

const ClientDashboardHomePage = () => {
  const { data: session } = useSession();

  const showModal = session?.user.onBoardingComplete === false;

  return (
    <>
      {showModal && <StepperClient open={showModal} />}
      <div>ClientDashboardHomePage</div>
    </>
  );
};

export default ClientDashboardHomePage;
