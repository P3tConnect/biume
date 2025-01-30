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
  CheckCircle2,
  Clock,
  MoreHorizontal,
  FileText,
  Bell,
  Ban,
  Briefcase,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { type Progression } from "@/src/db";
import { getProgression } from "@/src/actions/progression.action";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/src/lib";
import { eq } from "drizzle-orm";
import { organization, useActiveOrganization } from "@/src/lib/auth-client";

interface ProgressionWidgetProps {
  className?: string;
  onItemClick?: (key: keyof Omit<Progression, "id">) => void;
}

const progressionItems = {
  docs: {
    name: "Documents",
    icon: FileText,
    description: "Documents légaux et administratifs",
  },
  cancelPolicies: {
    name: "Politique d'annulation",
    icon: Ban,
    description: "Conditions d'annulation",
  },
  reminders: {
    name: "Rappels",
    icon: Bell,
    description: "Configuration des notifications",
  },
  services: {
    name: "Services",
    icon: Briefcase,
    description: "Configuration des services",
  },
} as const;

type ProgressionKey = keyof typeof progressionItems;

export const ProgressionWidget = ({
  className,
  onItemClick,
}: ProgressionWidgetProps) => {

  const progression: Progression = {
    id: 'erijjfnczuufijvc',
    docs: true,
    cancelPolicies: true,
    reminders: true,
    services: true,
  }

  const error = null;

  const isLoading = false;

  const getProgressPercentage = (data: Progression | null) => {
    if (!data) return 0;
    const progressFields = Object.keys(progressionItems) as ProgressionKey[];
    const completed = progressFields.filter((key) => data[key]).length;
    return Math.round((completed / progressFields.length) * 100);
  };

  if (isLoading) {
    return (
      <Card className={cn("w-full h-full rounded-2xl", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col space-y-3 p-4 border rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn("w-full h-full rounded-2xl", className)}>
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-sm text-muted-foreground">
            Erreur lors du chargement de la progression
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!progression) return null;

  return (
    <Card className={cn("w-full h-full rounded-2xl", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex flex-col">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            Configuration
          </CardTitle>
          <CardDescription>
            Progression de la configuration de votre compte
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {getProgressPercentage(progression)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-accent"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {(Object.entries(progressionItems) as Array<[ProgressionKey, typeof progressionItems[ProgressionKey]]>).map(
          ([key, item], index) => {
            const isCompleted = progression[key];
            const Icon = item.icon;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "group relative p-4 rounded-xl",
                  "hover:bg-accent/50 transition-all cursor-pointer",
                  "border border-border"
                )}
                onClick={() => onItemClick?.(key)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        isCompleted
                          ? "bg-green-500/10 text-green-500"
                          : "bg-blue-500/10 text-blue-500"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </div>

                <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className={cn(
                      "absolute h-full rounded-full",
                      isCompleted ? "bg-green-500" : "bg-blue-500"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
              </motion.div>
            );
          }
        )}
      </CardContent>
    </Card>
  );
};
