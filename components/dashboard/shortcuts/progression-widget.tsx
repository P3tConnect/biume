"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  CardDescription,
} from "@/components/ui";
import {
  Activity,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

interface ProgressItem {
  id: string;
  name: string;
  progress: number;
  status: "not-started" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

interface ProgressionWidgetProps {
  items?: ProgressItem[];
  className?: string;
  onItemClick?: (item: ProgressItem) => void;
}

const defaultItems: ProgressItem[] = [
  {
    id: "task-1",
    name: "Examens Médicaux",
    progress: 75,
    status: "in-progress",
    priority: "high",
    dueDate: "2024-02-15",
  },
  {
    id: "task-2",
    name: "Suivi Traitement",
    progress: 45,
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-02-20",
  },
  {
    id: "task-3",
    name: "Vaccination",
    progress: 100,
    status: "completed",
    priority: "high",
  },
  {
    id: "task-4",
    name: "Contrôle Routine",
    progress: 0,
    status: "not-started",
    priority: "low",
    dueDate: "2024-03-01",
  },
];

const priorityColors = {
  low: "bg-blue-500/10 text-blue-500",
  medium: "bg-orange-500/10 text-orange-500",
  high: "bg-red-500/10 text-red-500",
};

const statusIcons = {
  "not-started": Clock,
  "in-progress": Activity,
  completed: CheckCircle2,
};

export const ProgressionWidget = ({
  items = defaultItems,
  className,
  onItemClick,
}: ProgressionWidgetProps) => {
  const getStatusColor = (status: ProgressItem["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      default:
        return "bg-gray-300";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <Card className={cn("w-full h-full rounded-2xl", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex flex-col">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            Progression
          </CardTitle>
          <CardDescription>
            Suivi de la progression des consultations, des suivis de traitement
            et des rendez-vous
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-accent"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => {
          const StatusIcon = statusIcons[item.status];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                "group relative p-4 rounded-xl",
                "hover:bg-accent/50 transition-all cursor-pointer",
                "border border-border",
              )}
              onClick={() => onItemClick?.(item)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      priorityColors[item.priority],
                    )}
                  >
                    <StatusIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    {item.dueDate && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(item.dueDate)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.priority === "high" && (
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  )}
                  <span className="text-sm font-medium">{item.progress}%</span>
                </div>
              </div>

              <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    "absolute h-full rounded-full",
                    getStatusColor(item.status),
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};
