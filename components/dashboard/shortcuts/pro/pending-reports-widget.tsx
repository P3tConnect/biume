"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  FileTextIcon,
  ClockIcon,
  PawPrintIcon,
  ChevronRightIcon,
  UserIcon,
  StethoscopeIcon,
  XIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const PendingReportsWidget = () => {
  const [selectedReport, setSelectedReport] = React.useState<
    (typeof pendingReports)[0] | null
  >(null);

  // Exemple de données (à remplacer par vos vraies données)
  const pendingReports = [
    {
      id: 1,
      type: "Post-opératoire",
      petName: "Max",
      petType: "Chien",
      breed: "Berger Allemand",
      ownerName: "Marie Dubois",
      procedure: "Stérilisation",
      dueDate: "2024-03-20",
      priority: "high",
      status: "urgent",
      imageUrl: "/pets/dog1.jpg",
    },
    {
      id: 2,
      type: "Consultation",
      petName: "Luna",
      petType: "Chat",
      breed: "Siamois",
      ownerName: "Jean Martin",
      procedure: "Vaccination",
      dueDate: "2024-03-21",
      priority: "medium",
      status: "pending",
      imageUrl: "/pets/cat1.jpg",
    },
    {
      id: 3,
      type: "Suivi",
      petName: "Rex",
      petType: "Chien",
      breed: "Labrador",
      ownerName: "Sophie Bernard",
      procedure: "Traitement dermatologique",
      dueDate: "2024-03-22",
      priority: "low",
      status: "pending",
      imageUrl: "/pets/dog2.jpg",
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

  return (
    <Card className="border rounded-lg shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-md">
              <FileTextIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-xl font-semibold">
              Rapports à rédiger
            </CardTitle>
          </div>
          <Badge variant="secondary" className="px-2 py-0.5">
            {pendingReports.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-2">
            {pendingReports.map((report) => (
              <Sheet key={report.id}>
                <SheetTrigger asChild>
                  <div
                    className="flex items-center justify-between p-3 bg-muted/50 border border-muted hover:border-muted hover:bg-muted transition-colors rounded-md cursor-pointer"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border-2 border-background">
                        <AvatarImage
                          src={report.imageUrl}
                          alt={report.petName}
                        />
                        <AvatarFallback className="bg-purple-600">
                          <PawPrintIcon className="w-4 h-4 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{report.petName}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs px-1.5 py-0 rounded-sm ${getPriorityColor(report.priority)}`}
                          >
                            {report.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <UserIcon className="w-3 h-3" />
                            <span>{report.ownerName}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            <span>{report.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </SheetTrigger>
                <SheetContent className="sm:max-w-md">
                  <SheetHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="flex items-center gap-2">
                        <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-md">
                          <FileTextIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        Détails du rapport
                      </SheetTitle>
                      <Badge
                        variant="outline"
                        className={`${getPriorityColor(report.priority)}`}
                      >
                        {report.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-md">
                      <Avatar className="h-14 w-14 border-2 border-background">
                        <AvatarImage
                          src={report.imageUrl}
                          alt={report.petName}
                        />
                        <AvatarFallback className="bg-purple-600">
                          <PawPrintIcon className="w-6 h-6 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">
                            {report.petName}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {report.petType}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {report.breed}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <UserIcon className="w-3.5 h-3.5" />
                          <span>{report.ownerName}</span>
                        </div>
                      </div>
                    </div>
                  </SheetHeader>

                  <div className="space-y-6 mt-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Détails de la procédure
                      </h4>
                      <div className="bg-muted/30 p-3 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <StethoscopeIcon className="w-5 h-5 text-purple-600" />
                          <span className="font-medium">
                            {report.procedure}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Ce rapport concerne {report.procedure.toLowerCase()}{" "}
                          effectué sur {report.petName}. Il est important de le
                          compléter avant le {report.dueDate}.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Informations supplémentaires
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Date limite</span>
                          </div>
                          <span className="text-sm font-medium">
                            {report.dueDate}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                          <div className="flex items-center gap-2">
                            <AlertCircleIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Priorité</span>
                          </div>
                          <Badge
                            className={`${getPriorityColor(report.priority)}`}
                          >
                            {report.priority === "high"
                              ? "Haute"
                              : report.priority === "medium"
                                ? "Moyenne"
                                : "Basse"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <SheetFooter className="flex-row gap-2 sm:justify-end">
                    <SheetClose asChild>
                      <Button variant="outline" className="flex-1">
                        Annuler
                      </Button>
                    </SheetClose>
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                      Rédiger maintenant
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}

            {pendingReports.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-3">
                  <CheckCircleIcon className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-muted-foreground mb-1">
                  Tous les rapports sont à jour
                </p>
                <p className="text-sm text-muted-foreground">
                  Vous n'avez pas de rapports en attente pour le moment
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PendingReportsWidget;
