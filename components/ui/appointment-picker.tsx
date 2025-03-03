"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrganizationSlots } from "@/src/db";
import { format, isSameDay } from "date-fns";
import { useEffect, useState } from "react";

// Interfaces pour les différents types de créneaux
interface SimpleTimeSlot {
  time: string;
  available: boolean;
  date?: Date | string;
}

interface ComplexTimeSlot {
  start: string;
  isAvailable: boolean;
  date?: Date | string;
  day?: Date | string;
  startDate?: Date | string;
}

// Type permettant de supporter plusieurs formats de créneaux
type TimeSlotType = SimpleTimeSlot | ComplexTimeSlot;

interface AppointmentPickerProps {
  timeSlots: OrganizationSlots[];
  onSelectDateTime?: (date: Date, time: string | null) => void;
}

export default function AppointmentPicker({
  timeSlots = [],
  onSelectDateTime
}: AppointmentPickerProps) {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [time, setTime] = useState<string | null>(null);
  const [filteredSlots, setFilteredSlots] = useState<OrganizationSlots[]>([]);

  useEffect(() => {
    // Filtrer les créneaux pour la date sélectionnée
    const filtered = timeSlots.filter(slot => {
      // Convertir les dates de début et de fin en objets Date
      const startDate = new Date(slot.start);
      return isSameDay(startDate, date);
    });

    console.log("Date sélectionnée:", format(date, "yyyy-MM-dd"));
    console.log("Créneaux filtrés:", filtered);

    setFilteredSlots(filtered);
  }, [timeSlots, date]);

  // Handler pour mettre à jour la date
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setTime(null);
      if (onSelectDateTime) onSelectDateTime(newDate, null);
    }
  };

  // Handler pour mettre à jour l'heure
  const handleTimeChange = (timeSlot: string) => {
    setTime(timeSlot);
    if (onSelectDateTime) onSelectDateTime(date, timeSlot);
  };

  // Fonction pour formater l'heure à partir d'une date
  const formatTime = (dateStr: string | Date): string => {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    return format(date, 'HH:mm');
  };

  // Determiner si des créneaux sont disponibles pour cette date
  const hasSlots = filteredSlots.length > 0;

  return (
    <div>
      <div className="rounded-md border">
        <div className="flex max-sm:flex-col">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="p-2 sm:pe-5"
            disabled={[
              { before: today }, // Dates before today
            ]}
          />
          <div className="relative w-full max-sm:h-48 sm:w-40">
            <div className="absolute inset-0 py-4 max-sm:border-t">
              <ScrollArea className="h-full sm:border-s">
                <div className="space-y-3">
                  <div className="flex h-5 shrink-0 items-center px-5">
                    <p className="text-sm font-medium">{format(date, "EEEE, d")}</p>
                  </div>
                  <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                    {!hasSlots ? (
                      <div className="text-center text-sm text-muted-foreground col-span-2 py-4">
                        Aucun créneau disponible pour cette date
                      </div>
                    ) : (
                      filteredSlots.map((slot, index) => {
                        const timeString = formatTime(slot.start);
                        return (
                          <Button
                            key={index}
                            variant={time === timeString ? "default" : "outline"}
                            size="sm"
                            className="w-full"
                            onClick={() => handleTimeChange(timeString)}
                          >
                            {timeString}
                          </Button>
                        );
                      })
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
