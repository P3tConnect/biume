"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useEffect, useRef, useState } from "react";
import CalendarDropdown from "./components/calendar-dropdown";
import { logger } from "@/src/lib";
import { toast } from "sonner";
import { useLocale } from "next-intl";

const TimeTableFullWidth = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState("month");
  const [currentMonth, setCurrentMonth] = useState("");
  const locale = useLocale();

  return (
    <Card
      ref={containerRef}
      className="w-full bg-[#EEEFF5] h-full rounded-2xl border border-border dark:border-white dark:bg-background"
    >
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <CardTitle className="text-xl text-black dark:text-white">
          Calendrier et prochains rendez-vous
        </CardTitle>
        <div className="flex flew-row items-center gap-2">
          <CalendarDropdown viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </CardHeader>
      <div className="mt-5 flex justify-between items-center px-7">
        <div className="flex flew-row items-center gap-3">
          <div className="flex items-center justify-center gap-1">
            <div className="rounded-full bg-primary h-4 w-4"></div>
            <h1>Terminée</h1>
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
            <div className="rounded-full bg-primary h-4 w-4"></div>
            <h1>En demande</h1>
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
            <div className="rounded-full bg-blue-500 h-4 w-4"></div>
            <h1>À payer</h1>
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
            <div className="rounded-full bg-yellow-500 h-4 w-4"></div>
            <h1>En attente de confirmaton</h1>
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
            <div className="rounded-full bg-red-500 h-4 w-4"></div>
            <h1>Annulée</h1>
          </div>
        </div>
      </div>
      <CardContent className="text-black dark:text-white">

      </CardContent>
    </Card>
  );
};



export default TimeTableFullWidth;