import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { Search, SlidersHorizontal } from "lucide-react";
import React from "react";
import RemindersList from "../pages/reminders-page/reminders-list";

export const RemindersWidget = () => {
  return (
    <Card>
      <CardHeader className="flex items-start justify-start text-2xl font-bold">
        Liste des Rappels
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-row items-end justify-end text-center gap-2">
          <Button
            variant="outline"
            className="border border-secondary bg-transparent text-secondary"
            size="sm"
          >
            <Search size={15} className="text-secondary dark:text-white" />
          </Button>
          <Button
            variant="outline"
            className="border border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-white dark:text-white dark:border dark:border-secondary dark:hover:border-secondary"
            size="sm"
          >
            <div className="flex flex-row gap-2 items-center text-center">
              <SlidersHorizontal size={15} />
              Filtrer
            </div>
          </Button>
        </div>
        <RemindersList />
      </CardContent>
    </Card>
  );
};
