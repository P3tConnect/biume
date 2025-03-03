"use client";

import { cn } from "@/src/lib/utils";
import { getDaysInMonth, getFirstDayOfMonth } from "@/src/lib/dateUtils";
import { AppointmentCalendarItem } from "./appointment-calendar-item";
import type { DayAppointments } from "../types";

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  appointments: DayAppointments;
  onDayClick: (day: number) => void;
}

export function CalendarGrid({
  currentDate,
  selectedDate,
  appointments,
  onDayClick,
}: CalendarGridProps) {
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

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

    if (dayAppointments.length === 0) return null;

    return (
      <>
        {dayAppointments.slice(0, 1).map((appointment) => (
          <AppointmentCalendarItem
            key={appointment.id}
            appointment={appointment}
          />
        ))}
        {dayAppointments.length > 1 && (
          <div className="flex justify-end">
            <div className="text-[0.65rem] font-medium px-1 py-0.5 rounded-full bg-primary/10 text-primary">
              +{dayAppointments.length - 1}
            </div>
          </div>
        )}
      </>
    );
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
    <div className="space-y-1 mb-1">
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
          <div
            key={day}
            className={cn(
              "text-center text-xs font-medium",
              day === "Dim" || day === "Sam"
                ? "text-red-500"
                : "text-gray-600 dark:text-gray-300",
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {getWeeksInMonth().map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-2">
          {week.map((day, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={cn(
                "relative overflow-y-auto p-1.5 transition-all duration-200",
                "h-[130px]",
                day === 0
                  ? "invisible"
                  : cn(
                      "rounded-xl border border-border hover:border-border/80",
                      "dark:border-gray-700 dark:hover:border-gray-600",
                      isToday(day) && "bg-primary/5 ring-2 ring-primary",
                      isSelected(day) && "bg-secondary/5 ring-2 ring-secondary",
                      isWeekend(dayIndex) && "bg-muted/50",
                      "cursor-pointer",
                    ),
              )}
              onClick={() => day !== 0 && onDayClick(day)}
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
  );
}
