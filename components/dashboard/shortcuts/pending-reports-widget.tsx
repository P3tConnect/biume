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
  const [selectedReport, setSelectedReport] = React.useState<typeof pendingReports[0] | null>(null);

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
    <Card className="rounded-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileTextIcon className="w-5 h-5" />
            <CardTitle>Rapports à rédiger</CardTitle>
          </div>
          <Badge variant="secondary">{pendingReports.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-2">
            {pendingReports.map((report) => (
              <Sheet key={report.id}>
                <SheetTrigger asChild>
                  <div
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={report.imageUrl} alt={report.petName} />
                        <AvatarFallback className="bg-primary">
                          <PawPrintIcon className="w-4 h-4 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{report.petName}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs px-1.5 py-0 ${getPriorityColor(report.priority)}`}
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
                      <SheetTitle>Détails du rapport</SheetTitle>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(report.priority)}
                      >
                        {report.type}
                      </Badge>
                    </div>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={report.imageUrl} alt={report.petName} />
                        <AvatarFallback className="bg-primary">
                          <PawPrintIcon className="w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{report.petName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {report.petType} • {report.breed}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-muted-foreground" />
                        <span>Propriétaire: {report.ownerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StethoscopeIcon className="w-4 h-4 text-muted-foreground" />
                        <span>Procédure: {report.procedure}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-muted-foreground" />
                        <span>Date limite: {report.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
                    <div className="flex flex-col gap-2 w-full">
                      <Button size="lg" className="w-full">
                        Rédiger le rapport
                      </Button>
                      <SheetClose asChild>
                        <Button variant="outline" size="lg" className="w-full">
                          Fermer
                        </Button>
                      </SheetClose>
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PendingReportsWidget;
