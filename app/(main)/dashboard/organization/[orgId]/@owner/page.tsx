import React from "react";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { DashboardHomeHeader } from "@/components/dashboard/shortcuts/dashboard-home-header";
import MetricsWidget from "@/components/dashboard/shortcuts/metrics-widget";
import ObservationsWidget from "@/components/dashboard/shortcuts/observations-widget";
import PendingReportsWidget from "@/components/dashboard/shortcuts/pending-reports-widget";
import CalendarWidget from "@/components/dashboard/shortcuts/calendar-widget";
import PendingReservationsWidget from "@/components/dashboard/shortcuts/pending-reservations-widget";
import TopClientsWidget from "@/components/dashboard/shortcuts/top-clients-widget";

export const metadata: Metadata = {
  title: "Home - Dashboard",
  description: "Accueil du Dashboard",
};

const DashboardHomeProPage = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Top Section - Header and Metrics */}
      <DashboardHomeHeader />
      <div className="w-full">
        <MetricsWidget />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-12">
        {/* Left Column - Calendar and Tasks */}
        <div className="lg:col-span-8 space-y-4">
          {/* Calendar Section */}
          <Card className="p-4 rounded-2xl">
            <CalendarWidget />
          </Card>

          {/* Tasks Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ObservationsWidget />
            <PendingReportsWidget />
          </div>

          {/* Top Clients Section */}
          <TopClientsWidget />
        </div>

        {/* Right Column - Notifications and Actions */}
        <div className="lg:col-span-4 space-y-4">
          {/* Reservations Section */}
          <div className="sticky top-4">
            <PendingReservationsWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeProPage;
