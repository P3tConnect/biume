'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/src/lib/utils";
import { Clock, AlertCircle } from "lucide-react";

interface Task {
  id: number;
  title: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Appeler Mme Martin pour confirmer le rendez-vous",
    deadline: "Aujourd'hui 14:00",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Vérifier les résultats d'analyses de M. Dubois",
    deadline: "Aujourd'hui 16:00",
    priority: "medium",
    completed: false,
  },
  {
    id: 3,
    title: "Mettre à jour le dossier de Mme Bernard",
    deadline: "Demain 10:00",
    priority: "low",
    completed: false,
  },
  {
    id: 4,
    title: "Commander du matériel médical",
    deadline: "Demain 12:00",
    priority: "medium",
    completed: true,
  },
  {
    id: 5,
    title: "Réunion équipe médicale",
    deadline: "Demain 15:00",
    priority: "high",
    completed: false,
  },
];

const priorityStyles = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-blue-500",
};

export function PendingTasksWidget() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Tâches en attente</h3>
        <Badge variant="outline" className="font-normal">
          {tasks.filter(t => !t.completed).length} tâches
        </Badge>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg transition-colors",
                task.completed
                  ? "bg-muted/50"
                  : "bg-card hover:bg-accent/50"
              )}
            >
              <Checkbox
                checked={task.completed}
                className="mt-1"
              />

              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-medium line-clamp-2",
                  task.completed && "text-muted-foreground line-through"
                )}>
                  {task.title}
                </p>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.deadline}
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        priorityStyles[task.priority]
                      )}
                    />
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
} 