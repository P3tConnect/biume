import { Suspense } from "react";
import { TimetableView } from "@/components/dashboard/pages/pro/timetable-page/timetable-view";
import DashboardOrganizationTimetableLoading from "./loading";

// Données temporaires pour la démonstration
const mockAppointments = [
  {
    id: "1",
    clientName: "Jean Dupont",
    date: new Date(),
    time: "09:00",
    duration: 30,
    status: "confirmed" as const,
    notes: "Premier rendez-vous",
  },
  {
    id: "2",
    clientName: "Marie Martin",
    date: new Date(),
    time: "10:30",
    duration: 45,
    status: "pending" as const,
  },
  {
    id: "3",
    clientName: "Pierre Durand",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "14:00",
    duration: 60,
    status: "confirmed" as const,
  },
];

export default function DashboardOrganizationTimetablePage() {
  return (
    <div className="h-full w-full flex flex-col">
      <Suspense fallback={<DashboardOrganizationTimetableLoading />}>
        <TimetableView appointments={mockAppointments} />
      </Suspense>
    </div>
  );
}
