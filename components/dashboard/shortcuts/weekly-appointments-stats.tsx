import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

interface AppointmentStats {
  day: string;
  total: number;
  completed: number;
}

const weekStats: AppointmentStats[] = [
  { day: "Lu", total: 12, completed: 8 },
  { day: "Ma", total: 15, completed: 12 },
  { day: "Me", total: 10, completed: 7 },
  { day: "Je", total: 14, completed: 11 },
  { day: "Ve", total: 8, completed: 6 },
];

export function WeeklyAppointmentsStats() {
  const totalAppointments = weekStats.reduce((acc, day) => acc + day.total, 0);
  const totalCompleted = weekStats.reduce((acc, day) => acc + day.completed, 0);

  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Configuration hebdomadaire
          </CardTitle>
          <Badge variant="secondary" className="font-normal text-xs">
            {totalCompleted}/{totalAppointments} rdv
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="space-y-2">
          {weekStats.map((stat) => (
            <div key={stat.day} className="grid grid-cols-[2rem,1fr,3rem] gap-2 items-center">
              <span className="text-sm font-medium">{stat.day}</span>
              <Progress
                value={(stat.completed / stat.total) * 100}
                className="h-1.5"
              />
              <span className="text-xs text-muted-foreground text-right">
                {stat.completed}/{stat.total}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 