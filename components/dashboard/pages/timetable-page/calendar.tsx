"use client";

import {
  Calendar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import CalendarHeader from "./components/calendar-header";
import CalendarMonth from "./components/calendar-month";
import CalendarDay from "./components/calendar-day";
import CalendarWeek from "./components/calendar-week";

const CalendarComponent = () => {
  const [viewMode, setViewMode] = useState("month");
  const locale = useLocale();

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-3">
      <CalendarHeader />
      <div className="w-full h-full flex flex-row justify-center items-center gap-3">
        <div className="flex flex-col gap-3 w-1/3 h-full">
          <CalendarMonth />
          <CalendarDay />
        </div>
        <CalendarWeek />
      </div>
    </div>
  );
};



export default CalendarComponent;