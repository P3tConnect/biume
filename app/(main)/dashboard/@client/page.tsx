"use client";

import ClientInformationsStep from "@/components/onboarding/client/informations-step";
import React from "react";
import Stepper from "@/components/onboarding/components/stepper";
import { useSession } from "@/src/lib/auth-client";

const ClientDashboardHomePage = () => {
  const { data: session } = useSession();

  const showModal = session?.user.onBoardingComplete === false;

  return (
    <>
      {showModal && <Stepper open={showModal} />}
      <div>ClientDashboardHomePage</div>
    </>
  );
};

export default ClientDashboardHomePage;
