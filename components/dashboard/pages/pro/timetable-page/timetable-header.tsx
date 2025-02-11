"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, List, Clock } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface TimetableHeaderProps {
  view: "calendar" | "list";
  onViewChange: (view: "calendar" | "list") => void;
  onNewAppointment: () => void;
}

export function TimetableHeader({
  view,
  onViewChange,
  onNewAppointment,
}: TimetableHeaderProps) {
  return (
    <div className="pb-2">
      <Card className="overflow-hidden rounded-2xl">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Planification
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Gérez vos rendez-vous et votre emploi du temps
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewChange("calendar")}
                  className={cn(
                    "h-8 rounded-md transition-colors",
                    view === "calendar" && "bg-background shadow-sm",
                  )}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Calendrier
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewChange("list")}
                  className={cn(
                    "h-8 rounded-md transition-colors",
                    view === "list" && "bg-background shadow-sm",
                  )}
                >
                  <List className="h-4 w-4 mr-2" />
                  Liste
                </Button>
              </div>
              <Button
                onClick={onNewAppointment}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300"
              >
                <Clock className="mr-2 h-4 w-4" />
                Nouveau rendez-vous
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
