"use client";

import React from "react";
import ClientInformationsStep from "@/components/onboarding/client/informations-step";
import { useSession } from "@/src/lib/auth-client";

const ClientDashboardHomePage = () => {
  const { data: session } = useSession();

  const showModal = session?.user.onBoardingComplete === false;

  return (
    <>
      {showModal && <ClientInformationsStep />}
      <div>ClientDashboardHomePage</div>
    </>
  );
};

export default ClientDashboardHomePage;
