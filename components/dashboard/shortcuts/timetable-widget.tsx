"use client";

import {
  Calendar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
} from "@/components/ui";
import { cn } from "@/src/lib";
import { useState } from "react";

const TimetableWidget = () => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());

  return (
    <Card
      className={cn("lg:w-2/3 w-full h-full rounded-2xl border border-border")}
    >
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg text-gray-700 dark:text-gray-200">
          Calendrier et prochains rendez-vous
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full flex">
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={setCurrentDate}
          className="w-1/2"
        />
        <ScrollArea className="h-full w-1/2 flex flex-col justify-center items-center">
          <p className="text-sm text-center text-muted-foreground font-semibold">Aucune réservation en cours</p>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TimetableWidget;
