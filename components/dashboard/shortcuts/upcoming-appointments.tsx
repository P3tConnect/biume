import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Appointment {
  id: number;
  patientName: string;
  avatarUrl: string;
  time: string;
  date: string;
  type: string;
  status: "confirmed" | "pending" | "cancelled";
}

const appointments: Appointment[] = [
  {
    id: 1,
    patientName: "Sophie Martin",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    time: "09:00",
    date: "Aujourd'hui",
    type: "Consultation",
    status: "confirmed",
  },
  {
    id: 2,
    patientName: "Lucas Dubois",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    time: "10:30",
    date: "Aujourd'hui",
    type: "Suivi",
    status: "confirmed",
  },
  {
    id: 3,
    patientName: "Emma Bernard",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    time: "14:15",
    date: "Demain",
    type: "Urgence",
    status: "pending",
  },
  {
    id: 4,
    patientName: "Thomas Petit",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
    time: "16:00",
    date: "Demain",
    type: "Consultation",
    status: "confirmed",
  },
];

const statusColors = {
  confirmed: "bg-green-500",
  pending: "bg-yellow-500",
  cancelled: "bg-red-500",
};

export function UpcomingAppointments() {
  return (
    <Card className="p-4 rounded-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Rendez-vous à venir</h3>
          <Badge variant="outline" className="font-normal">
            {appointments.length} rendez-vous
          </Badge>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <img src={appointment.avatarUrl} alt={appointment.patientName} />
                  </Avatar>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${statusColors[appointment.status]
                      }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{appointment.patientName}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {appointment.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {appointment.date}
                    </span>
                  </div>
                </div>

                <Badge variant="secondary" className="whitespace-nowrap">
                  {appointment.type}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
