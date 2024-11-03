"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import CalendarHeader from "./components/calendar-header";
import CalendarMonth from "./components/calendar-month";
import CalendarDay from "./components/calendar-day";
import CalendarWeek from "./components/calendar-week";
import { useSidebar } from "@/components/ui";
import { cn } from "@/src/lib";

const CalendarComponent = () => {
  const [viewMode, setViewMode] = useState("month");
  const locale = useLocale();
  const { state } = useSidebar();

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-3">
      <CalendarHeader />
      <div className="w-full h-full flex flex-row justify-center items-center gap-3">
        <div className={cn("flex flex-col gap-3 h-full",
          state === "collapsed" ? "w-1/4" : "w-1/3"
        )}>
          <CalendarMonth />
          <CalendarDay />
        </div>
        <CalendarWeek />
      </div>
    </div>
  );
};



export default CalendarComponent;