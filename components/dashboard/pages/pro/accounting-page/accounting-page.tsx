import ButtonsSection from "./buttons-section";
import GraphSalesWidget from "./graph-sales-widget";
import LastClientMonthWidget from "./last-clients-month-widget";
import React from "react";
import ReservationRequestWidget from "./reservation-request";

const AccountingPageComponent = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <ButtonsSection />
      <div className="flex flex-col h-full gap-3 mt-3 sm:flex-row items-center justify-center content-center">
        <div className="flex flex-col h-full w-full gap-3 sm:w-1/3">
          {/* <SalesProWidget />
          <ExpensesProWidget /> */}
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

export default AccountingPageComponent;
