import React from "react";
import { Metadata } from "next";
import { DashboardHomeHeader } from "@/components/dashboard/shortcuts/pro/dashboard-home-header";
import { DailyMetrics } from "@/components/dashboard/shortcuts/pro/daily-metrics";
import { AppointmentRequests } from "@/components/dashboard/shortcuts/pro/appointment-requests";
import { DashboardTabs } from "@/components/dashboard/shortcuts/pro/dashboard-tabs";

export const metadata: Metadata = {
  title: "Dashboard Vétérinaire",
  description: "Dashboard pour professionnels vétérinaires",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const DashboardHomeProPage = () => {
  return (
    <div className="flex flex-col h-full gap-6">
      <DashboardHomeHeader />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-6 lg:col-span-1 h-full">
          <DailyMetrics />
          <AppointmentRequests />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <DashboardTabs />
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeProPage;
