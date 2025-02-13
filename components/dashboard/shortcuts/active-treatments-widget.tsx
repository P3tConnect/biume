import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PawPrintIcon, PillIcon } from "lucide-react";

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
    <Card>
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
        <div className="divide-y divide-border">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="py-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={treatment.imageUrl} alt={treatment.petName} />
                  <AvatarFallback className="bg-primary">
                    <PawPrintIcon className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{treatment.petName}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground truncate">{treatment.treatment}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(treatment.status)} shrink-0`}
                    >
                      {treatment.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Progress value={treatment.progress} className="h-1.5 flex-1" />
                    <span className="text-xs font-medium text-muted-foreground w-8 text-right">
                      {treatment.progress}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {treatment.remainingDoses
                        ? `${treatment.remainingDoses} doses restantes`
                        : treatment.notes}
                    </div>
                    <div className="text-sm font-medium">
                      {treatment.nextDose}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveTreatmentsWidget;
