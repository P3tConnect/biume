import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PawPrintIcon, PillIcon, CalendarIcon, TimerIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ActiveTreatmentsWidget = () => {
  const treatments = [
    {
      id: 1,
      petName: "Luna",
      petType: "Chien",
      breed: "Golden Retriever",
      treatment: "Antibiotiques",
      startDate: "2024-03-15",
      duration: "10 jours",
      progress: 70,
      remainingDoses: 6,
      nextDose: "Aujourd'hui 18:00",
      status: "En cours",
      imageUrl: "/pets/dog1.jpg",
      notes: "2 comprimés par jour",
    },
    {
      id: 2,
      petName: "Felix",
      petType: "Chat",
      breed: "Siamois",
      treatment: "Suivi post-opératoire",
      startDate: "2024-03-18",
      duration: "14 jours",
      progress: 30,
      remainingDoses: null,
      nextDose: "Prochain contrôle: demain",
      status: "Surveillance",
      imageUrl: "/pets/cat1.jpg",
      notes: "Vérifier la cicatrisation",
    },
    {
      id: 3,
      petName: "Rocky",
      petType: "Chien",
      breed: "Berger Allemand",
      treatment: "Physiothérapie",
      startDate: "2024-03-10",
      duration: "30 jours",
      progress: 45,
      remainingDoses: 8,
      nextDose: "Prochain RDV: 2024-03-22",
      status: "En cours",
      imageUrl: "/pets/dog2.jpg",
      notes: "2 séances par semaine",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "text-green-500 bg-green-100 dark:bg-green-900/30";
      case "Surveillance":
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
            <PillIcon className="w-5 h-5" />
            <CardTitle>Suivis en cours</CardTitle>
          </div>
          <Badge variant="secondary">{treatments.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="flex flex-col gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={treatment.imageUrl}
                      alt={treatment.petName}
                    />
                    <AvatarFallback className="bg-primary">
                      <PawPrintIcon className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{treatment.petName}</span>
                      <Badge
                        variant="outline"
                        className={getStatusColor(treatment.status)}
                      >
                        {treatment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span>{treatment.petType}</span>
                      <span>•</span>
                      <span>{treatment.breed}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{treatment.treatment}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline" className="text-xs">
                            {treatment.notes}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Instructions de traitement</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {treatment.progress}%
                  </span>
                </div>
                <Progress value={treatment.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" />
                    <span>Début: {treatment.startDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TimerIcon className="w-3 h-3" />
                    <span>Durée: {treatment.duration}</span>
                  </div>
                </div>
                {treatment.remainingDoses && (
                  <Badge variant="secondary" className="text-xs">
                    {treatment.remainingDoses} doses restantes
                  </Badge>
                )}
              </div>

              <div className="text-xs text-muted-foreground pt-1 border-t border-border">
                {treatment.nextDose}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveTreatmentsWidget;
