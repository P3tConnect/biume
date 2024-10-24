"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridDayPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import { useSidebarToggle, useStore } from "@/src/hooks";
import { useEffect, useRef, useState } from "react";
import { CalendarApi } from "@fullcalendar/core/index.js";
import { cn, logger } from "@/src/lib";
import { toast } from "sonner";
import CalendarDropdown from "./components/calendar-dropdown";
import useWindowSize from "@/src/hooks/use-window-size";
import { useLocale } from "next-intl";

const TimetableWidget = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const calendarRef = useRef<FullCalendar>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState("month");
  const [currentMonth, setCurrentMonth] = useState("");
  const [calendarApi, setCalendarApi] = useState<CalendarApi>();
  const locale = useLocale();
  const { windowSize } = useWindowSize();

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
      className={cn(
        "w-full bg-primary rounded-2xl border border-border dark:border-white",
      )}
    >
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl text-white">
          Calendrier et prochains rendez-vous
        </CardTitle>
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="default"
            onClick={handlePrev}
            className="rounded-full h-7 w-7 p-0"
          >
            <ArrowLeft size={18} />
          </Button>
          <Button
            variant="default"
            onClick={handleNext}
            className="rounded-full h-7 w-7 p-0"
          >
            <ArrowRight size={18} />
          </Button>
          <p className="text-white">
            {calendarApi && currentMonth != ""
              ? `${currentMonth.toUpperCase()}`
              : ""}
          </p>
          <CalendarDropdown viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </CardHeader>
      <CardContent className="text-white">
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
          height={windowSize.height! * 0.4}
          contentHeight={windowSize.height! * 0.4}
          dayMaxEvents={3}
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

export default TimetableWidget;
