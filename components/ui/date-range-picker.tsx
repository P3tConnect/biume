"use client";

import { cn } from "@/src/lib";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useId, useState, useEffect } from "react";
import { DateRange } from "react-day-picker";

export function DateRangePicker({
  label,
  date,
  onSelect,
}: {
  label: string;
  date: DateRange | undefined;
  onSelect: (date: DateRange | undefined) => void;
}) {
  const id = useId();
  const [localDate, setLocalDate] = useState<DateRange | undefined>(date);

  // Synchroniser l'état local avec les props
  useEffect(() => {
    setLocalDate(date);
  }, [date]);

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setLocalDate(selectedDate);
    onSelect(selectedDate);
  };

  return (
    <div>
      <div className="*:not-first:mt-2">
        <Label htmlFor={id}>{label}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant={"outline"}
              className={cn(
                "group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]",
                !localDate && "text-muted-foreground",
              )}
            >
              <span className={cn("truncate", !localDate && "text-muted-foreground")}>
                {localDate?.from ? (
                  localDate.to ? (
                    <>
                      {format(localDate.from, "dd MMM yyyy", { locale: fr })} - {format(localDate.to, "dd MMM yyyy", { locale: fr })}
                    </>
                  ) : (
                    format(localDate.from, "dd MMM yyyy", { locale: fr })
                  )
                ) : (
                  "Sélectionner une plage de dates"
                )}
              </span>
              <CalendarIcon
                size={16}
                className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <Calendar
              mode="range"
              selected={localDate}
              onSelect={handleSelect}
              locale={fr}
              footer={localDate?.from && !localDate.to ? "Sélectionnez la date de fin" : undefined}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
