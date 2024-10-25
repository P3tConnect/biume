"use client";

import "./calendar.css";

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
import { useLocale } from "next-intl";

const TimeTableFullWidth = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const calendarRef = useRef<FullCalendar>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState("month");
  const [currentMonth, setCurrentMonth] = useState("");
  const [calendarApi, setCalendarApi] = useState<CalendarApi>();
  const locale = useLocale();

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
      className="w-full h-full rounded-2xl border border-border -z-10 overflow-x-hidden overflow-y-hidden border-white bg-[#EEEFF5] text-black dark:border-white dark:bg-gray-700"
    >
      <CardHeader className="flex flex-col gap-10 w-full px-6">
        <div className="flex flex-row justify-between items-center gap-2">
          <CardTitle className="text-xl text-black dark:text-white">
            Calendrier et prochains rendez-vous
          </CardTitle>
          <div className="flex flew-row gap-2 items-center">
            <Button
              onClick={handlePrev}
              className="rounded-full h-7 w-7 p-0 text-white bg-primary dark:bg-white dark:text-black"
            >
              <ArrowLeft size={18} />
            </Button>
            <Button
              variant="default"
              onClick={handleNext}
              className="rounded-full h-7 w-7 p-0 text-white bg-primary dark:bg-white dark:text-black"
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
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <div className="h-4 w-4 rounded-sm bg-green-500"></div>
              <h1 className="text-sm text-black dark:text-white">Terminé</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="h-4 w-4 rounded-sm bg-primary"></div>
              <h1 className="text-sm text-black dark:text-white">En demande</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="h-4 w-4 rounded-sm bg-gray-500"></div>
              <h1 className="text-sm text-black dark:text-white">À payer</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="h-4 w-4 rounded-sm bg-black"></div>
              <h1 className="text-sm text-black dark:text-white">
                En attente de confirmation
              </h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="h-4 w-4 rounded-sm bg-red-500"></div>
              <h1 className="text-sm text-black dark:text-white">Annulé</h1>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center text-sm text-white">
            <Button
              variant="default"
              size="sm"
              onClick={() => { }}
              className="rounded-md"
            >
              Mois
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => { }}
              className="rounded-md"
            >
              Semaine
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => { }}
              className="rounded-md"
            >
              Jours
            </Button>
          </div>
        </div>
      </CardHeader>
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
          height={760}
          contentHeight={760}
          dayMaxEvents={3}
          dayCellClassNames={() => {
            return "bg-white";
          }}
          dayCellContent={() => {
            return <div className="h-full w-full bg-blue-500"></div>;
          }}
          // dateClick={(date) => {
          //   console.log(date.date, "date click");
          // }}
          // select={(date) => {
          //   console.log(date.start, "date select");
          // }}
          // eventClick={(event) => {
          //   console.log(event.view.title, "event click");
          // }}
          datesSet={(dates) => {
            setCurrentMonth(dates.view.title);
          }}
          headerToolbar={{
            left: "",
            right: "",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TimeTableFullWidth;
