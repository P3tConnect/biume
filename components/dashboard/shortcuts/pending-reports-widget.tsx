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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PendingReportsWidget = () => {
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
          <div className="space-y-3">
            {pendingReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={report.imageUrl} alt={report.petName} />
                      <AvatarFallback className="bg-primary">
                        <PawPrintIcon className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{report.petName}</span>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(report.priority)}
                        >
                          {report.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>{report.petType}</span>
                        <span>•</span>
                        <span>{report.breed}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {report.procedure}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ClockIcon className="w-4 h-4" />
                    <span>Pour le {report.dueDate}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 hover:bg-background"
                  >
                    Rédiger
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

export default PendingReportsWidget;
