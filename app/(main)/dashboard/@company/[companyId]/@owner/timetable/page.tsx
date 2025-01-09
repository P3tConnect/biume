"use client";

import { Suspense, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DailyAppointments } from "@/components/dashboard/pages/pro/timetable-page/daily-appointments";
import {
  AppointmentForm,
  AppointmentFormData,
} from "@/components/dashboard/pages/pro/timetable-page/appointment-form";
import { Badge } from "@/components/ui/badge";
import Calendar from "@/components/dashboard/pages/pro/timetable-page/calendar";

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

const DashboardOrganizationTimetablePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<AppointmentFormData | null>(null);

  const hasAppointmentsOnDate = (date: Date) => {
    return mockAppointments.some(
      (apt) => apt.date.toDateString() === date.toDateString(),
    );
  };

  const handleAddAppointment = (data: AppointmentFormData) => {
    // TODO: Implémenter l'ajout d'un rendez-vous
    console.log("Nouveau rendez-vous:", data);
  };

  const handleEditAppointment = (appointment: AppointmentFormData) => {
    setEditingAppointment(appointment);
    setIsFormOpen(true);
  };

  const handleDeleteAppointment = (appointment: AppointmentFormData) => {
    // TODO: Implémenter la suppression d'un rendez-vous
    console.log("Supprimer le rendez-vous:", appointment);
  };

  const dailyAppointments = mockAppointments.filter(
    (apt) => apt.date.toDateString() === selectedDate.toDateString(),
  );

  const getAppointmentsCountForDate = (date: Date) => {
    return mockAppointments.filter(
      (apt) => apt.date.toDateString() === date.toDateString(),
    ).length;
  };

  return (
    <div className="h-full w-full p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Planification des Rendez-vous</h1>
        <Button onClick={() => setIsFormOpen(true)} className="rounded-full">
          <Plus className="mr-2 h-4 w-4" />
          Nouveau rendez-vous
        </Button>
      </div>

      <Tabs defaultValue="calendar" className="w-full flex-1 flex flex-col">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="list">Liste des Rendez-vous</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            <Card className="md:col-span-2 p-4 flex flex-col">
              <Suspense fallback={<div>Chargement du calendrier...</div>}>
                <Calendar />
              </Suspense>
            </Card>

            <Card className="p-4 flex flex-col">
              <h2 className="font-semibold mb-4">
                Rendez-vous du {selectedDate.toLocaleDateString("fr-FR")}
              </h2>
              <div className="flex-1 overflow-hidden">
                <DailyAppointments
                  appointments={dailyAppointments}
                  selectedDate={selectedDate}
                />
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list" className="flex-1">
          <Card className="p-4 h-full"></Card>
        </TabsContent>
      </Tabs>

      <AppointmentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingAppointment(null);
        }}
        onSubmit={handleAddAppointment}
        initialData={editingAppointment || undefined}
        isEditing={!!editingAppointment}
      />
    </div>
  );
};

export default DashboardOrganizationTimetablePage;
