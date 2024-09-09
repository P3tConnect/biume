"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui";
import {
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridDayPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { logger } from "@/src/lib";
import { CalendarApi } from "@fullcalendar/core/index.js";
import { useCurrentLocale } from "@/src/locales";
import Link from "next/link";
import { useSidebarToggle, useStore } from "@/src/hooks";

const TimetableWidget = () => {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const currentLocale = useCurrentLocale();
  const calendarRef = useRef<FullCalendar>(null);
  const [viewMode, setViewMode] = useState("month");
  const [currentMonth, setCurrentMonth] = useState("");
  const [calendarApi, setCalendarApi] = useState<CalendarApi>();

  useEffect(() => {
    const calendar = calendarRef.current;
    if (calendar) {
      setCalendarApi(calendar.getApi());
    }
  }, []);

  const handleChangeView = (view: string) => {
    const calendar = calendarRef.current;
    if (calendar) {
      const api = calendar.getApi();

      api.changeView(view);
    }
  };

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

  return (
    <Card className="w-full bg-white h-1/2 dark:bg-black rounded-2xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl">
          Calendrier et prochains rendez-vous
        </CardTitle>
        <div className="flex justify-center items-center gap-2">
          <p>
            {calendarApi && currentMonth != ""
              ? `${currentMonth.toUpperCase()}`
              : ""}
          </p>
          <Button
            variant="outline"
            onClick={handlePrev}
            className="rounded-full h-7 w-7 p-0"
          >
            <ArrowLeft size={18} />
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            className="rounded-full h-7 w-7 p-0"
          >
            <ArrowRight size={18} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full h-7 w-7 p-0">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="font-bold">
                Options
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {viewMode == "week" ? <p>Semaine</p> : viewMode == "month" ? <p>Mois</p> : viewMode == "year" ? <p>Année</p> : null}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuCheckboxItem checked={viewMode === "week"} onCheckedChange={() => setViewMode("week")}>
                    <p>Semaine</p>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={viewMode === "month"} onCheckedChange={() => setViewMode("month")}>
                    <p>Mois</p>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={viewMode === "year"} onCheckedChange={() => setViewMode("year")}>
                    <p>Année</p>
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex justify-between items-center"
                asChild
              >
                <Link href={`/dashboard/timetable`}>
                  <p className="font-semibold">Voir plus</p>
                  <MoreHorizontal size={14} />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <FullCalendar
          ref={calendarRef}
          locale={currentLocale}
          plugins={[
            dayGridPlugin,
            timeGridDayPlugin,
            multiMonthPlugin,
            interactionPlugin,
          ]}
          editable={true}
          selectable={true}
          selectMirror={true}
          height={400}
          contentHeight={400}
          weekends={false}
          dayMaxEvents={3}
          dateClick={(date) => {
            console.log(date.date, "date click");
          }}
          select={(date) => {
            console.log(date.start, "date select");
          }}
          eventClick={(event) => {
            console.log(event.view.title, "event click");
          }}
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
