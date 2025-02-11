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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const handleDayClick = (day: number) => {
    if (day !== 0) {
      const newSelectedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );
      setSelectedDate(newSelectedDate);
      setIsDrawerOpen(true);
    }
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

  const renderSelectedDateAppointments = () => {
    if (!selectedDate) return null;
    const dateString = selectedDate.toDateString();
    const dayAppointments = appointments[dateString] || [];

    return (
      <div className="space-y-6">
        {dayAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-muted-foreground mb-2">
              Aucun rendez-vous pour cette journée
            </p>
            <p className="text-sm text-muted-foreground">
              Cliquez sur un autre jour pour voir les rendez-vous
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {dayAppointments.length} rendez-vous
              </p>
              <Button variant="outline" size="sm">
                + Nouveau rendez-vous
              </Button>
            </div>
            <div className="space-y-3">
              {dayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 rounded-lg border border-border space-y-3 hover:border-border/80 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{appointment.petName}</h3>
                        <Badge
                          variant={
                            appointment.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {appointment.status === "confirmed"
                            ? "Confirmé"
                            : "En attente"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appointment.ownerName}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full -mt-1"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        appointmentColors[appointment.type].replace(
                          "bg-",
                          "border-",
                        ),
                      )}
                    >
                      {appointmentLabels[appointment.type]}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <span>{appointment.time}</span>
                      <span>•</span>
                      <span>{appointment.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Annuler
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
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
                    onClick={() => handleDayClick(day)}
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

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="sm:max-w-md w-full">
          <SheetHeader className="space-y-1 mb-6">
            <SheetTitle className="text-lg">
              {selectedDate?.toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </SheetTitle>
            <p className="text-sm text-muted-foreground">
              Gérez les rendez-vous de cette journée
            </p>
          </SheetHeader>
          <div className="mt-2">{renderSelectedDateAppointments()}</div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CalendarWidget;
