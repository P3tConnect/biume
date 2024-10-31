import ButtonsSection from "@/components/dashboard/pages/accounting-page/buttons-section";
import React from "react";
import MonthExpensesWidget from "@/components/dashboard/shortcuts/month-expenses-widget";
import LastClientMonthWidget from "@/components/dashboard/shortcuts/last-clients-month-widget";
import GraphSalesWidget from "@/components/dashboard/shortcuts/graph-sales-widget";
import MonthSalesWidget from "@/components/dashboard/shortcuts/month-sales-widget";
import ReservationRequestWidget from "@/components/dashboard/shortcuts/reservation-request";

const DashboardCompanyAccoutingPage = () => {
  return (
    <div className="w-full max-h-full flex flex-col">
      <ButtonsSection />
      <div className="flex flex-col gap-3 mt-3 sm:flex-row items-center justify-center content-center">
        <div className="flex flex-col h-full w-full gap-3 sm:w-1/3">
          <MonthSalesWidget />
          <MonthExpensesWidget />
          <ReservationRequestWidget />
        </div>
        <div className="flex flex-col gap-3 w-full h-full">
          <GraphSalesWidget />
          <LastClientMonthWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardCompanyAccoutingPage;
