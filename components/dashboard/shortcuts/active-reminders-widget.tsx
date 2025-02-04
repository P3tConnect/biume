import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BellIcon,
  Cross2Icon,
  CalendarIcon,
  TimerIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/src/lib/utils";

const ActiveRemindersWidget = () => {
  // Exemple de données (à remplacer par vos vraies données)
  const activeReminders = [
    {
      id: 1,
      title: "Suivi post-soin",
      client: "Marie Dubois",
      dueDate: "2024-03-19",
      status: "En cours",
      type: "Suivi",
      progress: 75,
      priority: "high",
    },
    {
      id: 2,
      title: "Rappel rendez-vous",
      client: "Pierre Martin",
      dueDate: "2024-03-20",
      status: "Programmé",
      type: "RDV",
      progress: 25,
      priority: "medium",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-orange-500";
      default:
        return "text-blue-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BellIcon className="w-5 h-5" />
            <span>Rappels actifs</span>
          </CardTitle>
          <Badge variant="secondary">{activeReminders.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activeReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {reminder.client
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{reminder.title}</p>
                    <Badge
                      variant="outline"
                      className={getPriorityColor(reminder.priority)}
                    >
                      {reminder.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <PersonIcon className="w-3 h-3" />
                      <span>{reminder.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{reminder.dueDate}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs px-2 py-0.5",
                        getStatusColor(reminder.status),
                      )}
                    >
                      {reminder.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="h-8">
                <Cross2Icon className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveRemindersWidget;
