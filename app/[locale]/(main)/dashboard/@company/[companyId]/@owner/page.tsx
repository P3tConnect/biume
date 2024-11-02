import React from "react";
import { Metadata } from "next";
import ClientsProWidget from "@/components/dashboard/shortcuts/clients-widget";
import ExpensesProWidget from "@/components/dashboard/shortcuts/expenses-widget";
import SalesProWidget from "@/components/dashboard/shortcuts/sales-widget";
import TimetableWidget from "@/components/dashboard/shortcuts/timetable-widget";
import IncomingReservationsWidget from "@/components/dashboard/shortcuts/incoming-reservations-widget";
import ReservationsStatusesWidget from "@/components/dashboard/shortcuts/reservations-statuses-widget";
import RemindersShortcut from "@/components/dashboard/shortcuts/reminders-shortcut";

export const metadata: Metadata = {
  title: "Home - Dashboard",
  description: "Accueil du Dashboard",
};

const DashboardHomeProPage = () => {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row items-start justify-start h-full gap-3 md:mt-0 sm:mt-44 lg:mt-0">
      <div className="flex flex-col w-full md:w-1/4 h-full gap-3">
        <ClientsProWidget />
        <ExpensesProWidget />
        <SalesProWidget />
        <IncomingReservationsWidget />
      </div>
      <div className="flex flex-col w-full md:w-3/4 h-full gap-3">
        <TimetableWidget />
        <div className="flex w-full h-full gap-3">
          <ReservationsStatusesWidget />
          <RemindersShortcut />
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeProPage;
