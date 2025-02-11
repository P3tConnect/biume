"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { getDaysInMonth, getFirstDayOfMonth } from "@/src/lib/dateUtils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Appointment = {
  id: string;
  petName: string;
  ownerName: string;
  type: "consultation" | "surgery" | "grooming" | "vaccination" | "checkup";
  time: string;
  duration: string;
  status: "confirmed" | "pending" | "completed";
};

type DayAppointments = {
  [key: string]: Appointment[];
};

const appointmentColors = {
  consultation: "bg-blue-500 text-white hover:bg-blue-600",
  surgery: "bg-red-500 text-white hover:bg-red-600",
  grooming: "bg-purple-500 text-white hover:bg-purple-600",
  vaccination: "bg-green-500 text-white hover:bg-green-600",
  checkup: "bg-amber-500 text-white hover:bg-amber-600",
};

const appointmentLabels = {
  consultation: "Consultation",
  surgery: "Chirurgie",
  grooming: "Toilettage",
  vaccination: "Vaccination",
  checkup: "Contrôle",
};

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Exemple de données (à remplacer par vos vraies données)
  const appointments: DayAppointments = {
    [new Date().toDateString()]: [
      {
        id: "1",
        petName: "Luna",
        ownerName: "Sophie Martin",
        type: "consultation",
        time: "09:00",
        duration: "30min",
        status: "confirmed",
      },
      {
        id: "2",
        petName: "Max",
        ownerName: "Pierre Dubois",
        type: "vaccination",
        time: "10:30",
        duration: "15min",
        status: "confirmed",
      },
    ],
    [new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()]: [
      {
        id: "3",
        petName: "Rocky",
        ownerName: "Marie Leroy",
        type: "surgery",
        time: "14:00",
        duration: "1h30",
        status: "confirmed",
      },
    ],
    [new Date(new Date().setDate(new Date().getDate() + 3)).toDateString()]: [
      {
        id: "4",
        petName: "Milo",
        ownerName: "Jean Bernard",
        type: "grooming",
        time: "11:00",
        duration: "1h",
        status: "pending",
      },
      {
        id: "5",
        petName: "Felix",
        ownerName: "Alice Renard",
        type: "checkup",
        time: "15:30",
        duration: "30min",
        status: "confirmed",
      },
    ],
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1),
    );
  };

  const isToday = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    return date.toDateString() === new Date().toDateString();
  };

  const isSelected = (day: number) => {
    if (!selectedDate || day === 0) return false;
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    return date.toDateString() === selectedDate.toDateString();
  };

  const isWeekend = (dayIndex: number) => {
    return dayIndex === 0 || dayIndex === 6;
  };

  const renderAppointments = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    const dateString = date.toDateString();
    const dayAppointments = appointments[dateString] || [];

    return dayAppointments.map((appointment) => (
      <TooltipProvider key={appointment.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "text-xs truncate rounded-lg px-2 py-1 mb-1 cursor-pointer transition-all",
                appointmentColors[appointment.type],
                "hover:ring-2 hover:ring-white/20",
              )}
            >
              {appointment.time} - {appointment.petName}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">
                {appointmentLabels[appointment.type]}
              </p>
              <p className="text-sm">{appointment.petName}</p>
              <p className="text-sm text-muted-foreground">
                {appointment.ownerName}
              </p>
              <p className="text-sm">Durée: {appointment.duration}</p>
              <Badge
                variant={
                  appointment.status === "confirmed" ? "default" : "secondary"
                }
              >
                {appointment.status === "confirmed" ? "Confirmé" : "En attente"}
              </Badge>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ));
  };

  const getWeeksInMonth = () => {
    const weeks: number[][] = [];
    let currentWeek: number[] = [];

    // Remplir les jours vides du début
    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(0);
    }

    // Remplir les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Remplir les jours vides de fin
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(0);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrevMonth}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-xl hover:bg-secondary/5"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleNextMonth}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-xl hover:bg-secondary/5"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-1">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
            <div
              key={day}
              className={cn(
                "text-center text-sm font-medium p-1",
                day === "Dim" || day === "Sam"
                  ? "text-red-500"
                  : "text-gray-600 dark:text-gray-300",
              )}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {getWeeksInMonth().map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={cn(
                    "relative overflow-y-auto p-1.5 transition-all duration-200",
                    "min-h-[110px]",
                    day === 0
                      ? "invisible"
                      : cn(
                          "rounded-xl border border-border hover:border-border/80",
                          "dark:border-gray-700 dark:hover:border-gray-600",
                          isToday(day) && "bg-primary/5 ring-2 ring-primary",
                          isSelected(day) &&
                            "bg-secondary/5 ring-2 ring-secondary",
                          isWeekend(dayIndex) && "bg-muted/50",
                          "cursor-pointer",
                        ),
                  )}
                  onClick={() => {
                    if (day !== 0) {
                      setSelectedDate(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day,
                        ),
                      );
                    }
                  }}
                >
                  {day !== 0 && (
                    <>
                      <div
                        className={cn(
                          "text-sm font-medium mb-1.5",
                          isToday(day) && "text-primary",
                          isSelected(day) && "text-secondary",
                        )}
                      >
                        {day}
                      </div>
                      {renderAppointments(day)}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
