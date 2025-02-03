import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BellIcon,
  Cross2Icon,
  CalendarIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

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

  return (
    <Card className="rounded-2xl h-full">
      <CardHeader className="pb-3">
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
              className="flex flex-col gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {reminder.client
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{reminder.title}</p>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(reminder.priority)}
                      >
                        {reminder.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {reminder.client}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    reminder.status === "En cours" ? "default" : "secondary"
                  }
                >
                  {reminder.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TimerIcon className="w-4 h-4" />
                    <span>Progression</span>
                  </div>
                  <span className="font-medium">{reminder.progress}%</span>
                </div>
                <Progress value={reminder.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Échéance : {reminder.dueDate}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Cross2Icon className="w-4 h-4 mr-1" />
                  Terminer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveRemindersWidget;
