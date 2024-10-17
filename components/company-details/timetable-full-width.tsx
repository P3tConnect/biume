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
import { useSidebarToggle, useStore } from "@/src/hooks";

import { CalendarApi } from "@fullcalendar/core/index.js";
import CalendarDropdown from "../dashboard/shortcuts/components/calendar-dropdown";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { logger } from "@/src/lib";
import multiMonthPlugin from "@fullcalendar/multimonth";
import timeGridDayPlugin from "@fullcalendar/timegrid";
import { toast } from "sonner";
import { useCurrentLocale } from "@/src/locales";

const TimeTableFullWidth = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const calendarRef = useRef<FullCalendar>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState("month");
  const [currentMonth, setCurrentMonth] = useState("");
  const [calendarApi, setCalendarApi] = useState<CalendarApi>();
  const locale = useCurrentLocale();

  useEffect(() => {
    const calendar = calendarRef.current;
    if (calendar) {
      setCalendarApi(calendar.getApi());
    }
  }, []);

  useEffect(() => {
    const calendar = calendarRef.current;
    if (calendar) {
      setCalendarApi(calendar.getApi());
    }
  }, []);

  // !!! That useEffect is here to update the calendar size when the container changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.updateSize(); // Adjusts FullCalendar's size when the container changes
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current); // Observing the container
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // !!!

  const handleNext = () => {
    if (calendarApi) {
      calendarApi.next();
    } else {
      logger.error("Calendar ref not found", calendarApi);
      toast.error("Erreur lors de la navigation, veuillez réessayer plus tard");
    }
  };

  const handlePrev = () => {
    if (calendarApi) {
      calendarApi.prev();
    } else {
      logger.error("Calendar ref not found", calendarApi);
      toast.error("Erreur lors de la navigation, veuillez réessayer plus tard");
    }
  };

  const handleChangeView = (view: string) => {
    if (calendarApi) {
      calendarApi.changeView(view);
    }
  };

  return (
    <Card
      ref={containerRef}
      className="w-full bg-[#EEEFF5] h-full rounded-2xl border border-border dark:border-white dark:bg-background"
    >
      <CardHeader className="flex flex-col items-start justify-start sm:px-7 sm:flex sm:flex-row sm:justify-between sm:items-center">
        <CardTitle className="text-xl text-black dark:text-white">
          Calendrier et prochains rendez-vous
        </CardTitle>
        <div className="flex flew-row items-center gap-2">
          <Button
            variant="secondary"
            onClick={handlePrev}
            className="rounded-full h-7 w-7 p-0"
          >
            <ArrowLeft size={18} />
          </Button>
          <Button
            variant="secondary"
            onClick={handleNext}
            className="rounded-full h-7 w-7 p-0"
          >
            <ArrowRight size={18} />
          </Button>
          <p className="text-black dark:text-white">
            {calendarApi && currentMonth != ""
              ? `${currentMonth.toUpperCase()}`
              : ""}
          </p>
          <CalendarDropdown viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </CardHeader>
      <div className="flex flex-col items-start justify-start px-7 2xl:mt-5 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <div className="grid grid-cols-2 gap-4 sm:flex flex-row items-center justify-center">
          <div className="flex items-center gap-1">
            <div className="rounded-full bg-primary h-4 w-4"></div>
            <h1>Terminée</h1>
          </div>
          <div className="flex items-center gap-1">
            <div className="rounded-full bg-secondary h-4 w-4"></div>
            <h1>En demande</h1>
          </div>
          <div className="flex items-center gap-1">
            <div className="rounded-full bg-blue-500 h-4 w-4"></div>
            <h1>À payer</h1>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="rounded-full bg-yellow-500 h-4 w-4"></div>
            <h1>En attente de confirmation</h1>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Button variant="secondary" onClick={() => {}} className="rounded-md">
            Mois
          </Button>
          <Button variant="secondary" onClick={() => {}} className="rounded-md">
            Semaine
          </Button>
          <Button variant="secondary" onClick={() => {}} className="rounded-md">
            jours
          </Button>
        </div>
      </div>
      <CardContent className="text-black dark:text-white">
        <FullCalendar
          ref={calendarRef}
          locale={locale}
          plugins={[
            dayGridPlugin,
            timeGridDayPlugin,
            multiMonthPlugin,
            interactionPlugin,
          ]}
          editable={true}
          firstDay={1}
          selectable={true}
          selectMirror={true}
          height={700}
          contentHeight={700}
          dayMaxEvents={3}
          datesSet={(dates) => {
            setCurrentMonth(dates.view.title);
          }}
          headerToolbar={{
            left: "",
            right: "",
          }}
          dayCellClassNames={(info) => {
            return "bg-white font-bold dark:bg-background";
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TimeTableFullWidth;
