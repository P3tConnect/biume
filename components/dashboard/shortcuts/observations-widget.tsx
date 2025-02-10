"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  StethoscopeIcon,
  ClockIcon,
  PawPrintIcon,
  ChevronRightIcon,
  UserIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ObservationsWidget = () => {
  // Exemple de données (à remplacer par vos vraies données)
  const observations = [
    {
      id: 1,
      type: "Surveillance post-op",
      petName: "Charlie",
      petType: "Chien",
      breed: "Carlin",
      ownerName: "Sophie Laurent",
      symptoms: ["Difficulté respiratoire", "Fatigue"],
      notes:
        "Surveiller la cicatrisation et les signes de détresse respiratoire",
      startDate: "2024-03-19",
      duration: "72h",
      priority: "high",
      status: "en cours",
      imageUrl: "/pets/dog3.jpg",
      lastCheck: "Il y a 2h",
    },
    {
      id: 2,
      type: "Suivi traitement",
      petName: "Milo",
      petType: "Chat",
      breed: "Persan",
      ownerName: "Marc Dubois",
      symptoms: ["Perte d'appétit"],
      notes: "Vérifier la prise de poids quotidienne",
      startDate: "2024-03-20",
      duration: "48h",
      priority: "medium",
      status: "à faire",
      imageUrl: "/pets/cat2.jpg",
      lastCheck: "Il y a 6h",
    },
    {
      id: 3,
      type: "Observation comportementale",
      petName: "Nina",
      petType: "Chat",
      breed: "Européen",
      ownerName: "Julie Martin",
      symptoms: ["Agressivité inhabituelle"],
      notes: "Observer le comportement avec les autres animaux",
      startDate: "2024-03-21",
      duration: "24h",
      priority: "low",
      status: "planifié",
      imageUrl: "/pets/cat3.jpg",
      lastCheck: "Aujourd'hui 9h",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-100 dark:bg-red-900/30";
      case "medium":
        return "text-orange-500 bg-orange-100 dark:bg-orange-900/30";
      default:
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en cours":
        return "text-green-500 bg-green-100 dark:bg-green-900/30";
      case "à faire":
        return "text-orange-500 bg-orange-100 dark:bg-orange-900/30";
      default:
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
    }
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StethoscopeIcon className="w-5 h-5" />
            <CardTitle>Observations à réaliser</CardTitle>
          </div>
          <Badge variant="secondary">{observations.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-3">
            {observations.map((observation) => (
              <div
                key={observation.id}
                className="flex flex-col gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={observation.imageUrl}
                        alt={observation.petName}
                      />
                      <AvatarFallback className="bg-primary">
                        <PawPrintIcon className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {observation.petName}
                        </span>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(observation.priority)}
                        >
                          {observation.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>{observation.petType}</span>
                        <span>•</span>
                        <span>{observation.breed}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                <AlertCircleIcon className="w-3 h-3 mr-1" />
                                <span className="text-xs">
                                  {observation.symptoms.length} symptôme(s)
                                </span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <ul className="list-disc list-inside">
                                {observation.symptoms.map((symptom, index) => (
                                  <li key={index} className="text-sm">
                                    {symptom}
                                  </li>
                                ))}
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Badge
                          variant="outline"
                          className={getStatusColor(observation.status)}
                        >
                          {observation.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground bg-background/50 rounded-md p-2">
                  {observation.notes}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>Durée: {observation.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-3 h-3" />
                      <span>Dernier contrôle: {observation.lastCheck}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 hover:bg-background"
                  >
                    Observer
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ObservationsWidget;
