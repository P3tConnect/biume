import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/src/lib/utils";
import { FileText, Clock, AlertCircle } from "lucide-react";

interface Report {
  id: number;
  patientName: string;
  type: "consultation" | "operation" | "suivi";
  deadline: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const reports: Report[] = [
  {
    id: 1,
    patientName: "Sophie Martin",
    type: "consultation",
    deadline: "Aujourd'hui 14:00",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    patientName: "Lucas Dubois",
    type: "operation",
    deadline: "Aujourd'hui 16:00",
    priority: "high",
    completed: false,
  },
  {
    id: 3,
    patientName: "Emma Bernard",
    type: "suivi",
    deadline: "Demain 10:00",
    priority: "medium",
    completed: false,
  },
  {
    id: 4,
    patientName: "Thomas Petit",
    type: "consultation",
    deadline: "Demain 12:00",
    priority: "low",
    completed: true,
  },
];

const priorityStyles = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-blue-500",
};

const typeLabels = {
  consultation: "Consultation",
  operation: "Opération",
  suivi: "Suivi",
};

export function PendingReportsWidget() {
  const pendingReports = reports.filter(r => !r.completed).length;

  return (
    <Card className="rounded-2xl">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Rapports à rédiger
          </CardTitle>
          <Badge variant="secondary" className="font-normal text-xs">
            {pendingReports} en attente
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg transition-colors",
                  report.completed
                    ? "bg-muted/50"
                    : "bg-card hover:bg-accent/50"
                )}
              >
                <Checkbox
                  checked={report.completed}
                  className="mt-1"
                />

                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-medium line-clamp-1",
                    report.completed && "text-muted-foreground line-through"
                  )}>
                    {report.patientName}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <Badge variant="outline" className="font-normal">
                      {typeLabels[report.type]}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {report.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          priorityStyles[report.priority]
                        )}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 