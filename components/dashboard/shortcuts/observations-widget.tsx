"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  StethoscopeIcon,
  PawPrintIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

const ObservationsWidget = () => {
  const [selectedObservation, setSelectedObservation] = React.useState<any>(null);
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
    <>
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
            <div className="space-y-2">
              {observations.map((observation) => (
                <div
                  key={observation.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                  onClick={() => setSelectedObservation(observation)}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={observation.imageUrl}
                        alt={observation.petName}
                      />
                      <AvatarFallback className="bg-primary">
                        <PawPrintIcon className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{observation.petName}</span>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(observation.priority)}
                        >
                          {observation.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Dernier contrôle: {observation.lastCheck}
                      </div>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-muted-foreground ml-4" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Sheet open={!!selectedObservation} onOpenChange={() => setSelectedObservation(null)}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Détails de l'observation</SheetTitle>
          </SheetHeader>
          {selectedObservation && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedObservation.imageUrl}
                    alt={selectedObservation.petName}
                  />
                  <AvatarFallback className="bg-primary">
                    <PawPrintIcon className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{selectedObservation.petName}</h3>
                    <Badge variant="outline" className={getPriorityColor(selectedObservation.priority)}>
                      Priorité {selectedObservation.priority === "high" ? "haute" : selectedObservation.priority === "medium" ? "moyenne" : "basse"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {selectedObservation.petType} • {selectedObservation.breed}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium mb-3">Informations sur l'animal</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Type d'observation:</span>
                      <p className="font-medium">{selectedObservation.type}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Date de début:</span>
                      <p className="font-medium">{selectedObservation.startDate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Durée prévue:</span>
                      <p className="font-medium">{selectedObservation.duration}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Dernier contrôle:</span>
                      <p className="font-medium">{selectedObservation.lastCheck}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Statut:</span>
                      <Badge className={`mt-1 ${getStatusColor(selectedObservation.status)}`}>
                        {selectedObservation.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Informations sur le propriétaire</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Nom:</span>
                      <p className="font-medium">{selectedObservation.ownerName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Animal:</span>
                      <p className="font-medium">{selectedObservation.petType} {selectedObservation.breed}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Symptômes</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedObservation.symptoms.map((symptom: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Notes</h4>
                <p className="text-muted-foreground bg-muted p-3 rounded-md">
                  {selectedObservation.notes}
                </p>
              </div>

              <SheetFooter>
                <Button className="w-full">
                  Commencer l'observation
                  <ChevronRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ObservationsWidget;
