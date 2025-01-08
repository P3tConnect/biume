"use client";

import React from "react";
import TimetableWidget from "@/components/dashboard/shortcuts/timetable-widget";
import { ClientWithLastProcedure } from "@/components/dashboard/shortcuts/clients-last-procedure";
import TeamMembersCard from "@/components/dashboard/shortcuts/team-members";
import MetricsWidget from "@/components/dashboard/shortcuts/metrics-widget";
import { UpcomingAppointments } from "@/components/dashboard/shortcuts/upcoming-appointments";
import AverageDailySalesCard from "@/components/dashboard/shortcuts/average-daily-sales";
import ProgressionWidget from "@/components/dashboard/shortcuts/progression-widget";
import { ObservationsWidget } from "@/components/dashboard/shortcuts/observations-widget";
import { useSession } from "@/src/lib/auth-client";
import Stepper from "@/components/onboarding/components/stepper";

const ClientDashboardHomePage = () => {
  const { data: session } = useSession();

  const showModal = session?.user.onBoardingComplete === false;

  return (
    <>
      {showModal && <Stepper open={showModal} />}
      <div className="flex flex-col gap-4">
        <MetricsWidget />
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <TimetableWidget />
          </div>
          <div className="lg:col-span-4">
            <UpcomingAppointments />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4">
            <TeamMembersCard />
            <AverageDailySalesCard />
          </div>
          <div className="lg:col-span-4">
            <ClientWithLastProcedure />
          </div>
          <div className="lg:col-span-4">
            <ProgressionWidget />
          </div>
          <div className="lg:col-span-4">
            <ObservationsWidget />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDashboardHomePage;
