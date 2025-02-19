"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  List,
  Calendar as CalendarIcon,
  CalendarDays,
} from "lucide-react";
import {
  ScrollArea,
  CardTitle,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
} from "@/components/ui";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { CalendarGrid } from "./components/calendar-grid";
import { AppointmentListItem } from "./components/appointment-list-item";
import { AppointmentDetails } from "./components/appointment-details";
import { CALENDAR_VIEW_MODE_KEY, mockAppointments } from "./data/constants";

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

  // Charger la préférence utilisateur au montage du composant
  useEffect(() => {
    const savedMode = localStorage.getItem(CALENDAR_VIEW_MODE_KEY);
    if (savedMode === "calendar" || savedMode === "list") {
      setViewMode(savedMode);
    }
  }, []);

  // Sauvegarder la préférence utilisateur quand elle change
  useEffect(() => {
    localStorage.setItem(CALENDAR_VIEW_MODE_KEY, viewMode);
  }, [viewMode]);

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

  const renderSelectedDateAppointments = () => {
    if (!selectedDate) return null;
    const dateString = selectedDate.toDateString();
    const dayAppointments = mockAppointments[dateString] || [];

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
                <AppointmentDetails
                  key={appointment.id}
                  appointment={appointment}
                />
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
        <div className="flex items-center justify-between pb-4">
          {viewMode === "calendar" ? (
            <div className="flex items-center justify-between gap-4 flex-1">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="size-6 text-primary" />
                  {capitalizeFirstLetter(
                    currentDate.toLocaleString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    }),
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Consultez et gérez vos rendez-vous
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handlePrevMonth}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-xl hover:bg-secondary/5"
                    >
                      <ChevronLeft
                        className="h-4 w-4"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mois précédent</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleNextMonth}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-xl hover:bg-secondary/5"
                    >
                      <ChevronRight
                        className="h-4 w-4"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mois suivant</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="size-6 text-primary" />
                  Rendez-vous du jour
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {capitalizeFirstLetter(
                    format(new Date(), "EEEE d MMMM yyyy", { locale: fr }),
                  )}
                </p>
              </div>
            </div>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-xl hover:bg-secondary/5"
                onClick={() =>
                  setViewMode(viewMode === "calendar" ? "list" : "calendar")
                }
              >
                {viewMode === "calendar" ? (
                  <List
                    className="h-4 w-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ) : (
                  <CalendarIcon
                    className="h-4 w-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Basculer en vue{" "}
                {viewMode === "calendar" ? "liste" : "calendrier"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {viewMode === "calendar" ? (
          <div className="flex-1 overflow-auto px-1">
            <CalendarGrid
              currentDate={currentDate}
              selectedDate={selectedDate}
              appointments={mockAppointments}
              onDayClick={handleDayClick}
            />
          </div>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            {(mockAppointments[new Date().toDateString()] || []).map(
              (appointment, index) => (
                <AppointmentListItem
                  key={appointment.id}
                  appointment={appointment}
                  index={index}
                  onSelect={() => {
                    setSelectedDate(new Date());
                    setIsDrawerOpen(true);
                  }}
                />
              ),
            )}
          </ScrollArea>
        )}
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
