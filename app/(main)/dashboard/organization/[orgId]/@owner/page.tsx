import React from "react";
import { Metadata } from "next";
import TimetableWidget from "@/components/dashboard/shortcuts/timetable-widget";
import { ClientWithLastProcedure } from "@/components/dashboard/shortcuts/clients-last-procedure";
import TeamMembersCard from "@/components/dashboard/shortcuts/team-members";
import MetricsWidget from "@/components/dashboard/shortcuts/metrics-widget";
import { UpcomingAppointments } from "@/components/dashboard/shortcuts/upcoming-appointments";
import AverageDailySalesCard from "@/components/dashboard/shortcuts/average-daily-sales";
import { ProgressionWidget } from "@/components/dashboard/shortcuts/progression-widget";
import { ObservationsWidget } from "@/components/dashboard/shortcuts/observations-widget";
import { DashboardHomeHeader } from "@/components/dashboard/shortcuts/dashboard-home-header";
import { FinancialStatsWidget } from "@/components/dashboard/shortcuts/financial-stats-widget";
import { PendingTasksWidget } from "@/components/dashboard/shortcuts/pending-tasks-widget";
import { RecentReviewsWidget } from "@/components/dashboard/shortcuts/recent-reviews-widget";
import { WeeklyAppointmentsStats } from "@/components/dashboard/shortcuts/weekly-appointments-stats";
import { PendingReportsWidget } from "@/components/dashboard/shortcuts/pending-reports-widget";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Home - Dashboard",
  description: "Accueil du Dashboard",
};

const DashboardHomeProPage = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* Top Section - Key Metrics */}
      <DashboardHomeHeader />
      <MetricsWidget />

      {/* Main Content Grid */}
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-12">
        {/* Left Column - Calendar and Appointments */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <TimetableWidget />
          <PendingReportsWidget />
        </div>

        {/* Middle Column - Activity and Progress */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <UpcomingAppointments />
          <ProgressionWidget />
        </div>

        {/* Right Column - Business Insights */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <AverageDailySalesCard />
          <ClientWithLastProcedure />
          <TeamMembersCard />
        </div>

        {/* Full Width Section - Tasks */}
        <div className="lg:col-span-12">
          <ObservationsWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeProPage;
