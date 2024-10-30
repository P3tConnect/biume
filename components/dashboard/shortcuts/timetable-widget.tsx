"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { cn } from "@/src/lib";

const TimetableWidget = () => {
  return (
    <Card
      className={cn(
        "w-full bg-primary rounded-2xl border border-border dark:border-white",
      )}
    >
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl text-white">
          Calendrier et prochains rendez-vous
        </CardTitle>
      </CardHeader>
      <CardContent className="text-white"></CardContent>
    </Card>
  );
};

export default TimetableWidget;
