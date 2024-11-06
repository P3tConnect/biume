"use client";

import {
  Calendar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
        <CardTitle className="text-lg text-gray-600 dark:text-gray-200">
          Calendrier et prochains rendez-vous
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={setCurrentDate}
          captionLayout="buttons"
        />
      </CardContent>
    </Card>
  );
};

export default TimetableWidget;
