"use client";

import { Suspense, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DailyAppointments } from "@/components/dashboard/pages/pro/timetable-page/daily-appointments";
import { AppointmentsList } from "@/components/dashboard/pages/pro/timetable-page/appointments-list";
import { AppointmentForm, AppointmentFormData } from "@/components/dashboard/pages/pro/timetable-page/appointment-form";

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
  const [editingAppointment, setEditingAppointment] = useState<AppointmentFormData | null>(null);

  const hasAppointmentsOnDate = (date: Date) => {
    return mockAppointments.some(
      (apt) => apt.date.toDateString() === date.toDateString()
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
    (apt) => apt.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Planification des Rendez-vous</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau rendez-vous
        </Button>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="list">Liste des Rendez-vous</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[700px]">
            <Card className="md:col-span-2 p-4 flex flex-col">
              <Suspense fallback={<div>Chargement du calendrier...</div>}>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="flex-1 w-full"
                  components={{
                    DayContent: ({ date }) => (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <span>{date.getDate()}</span>
                        {hasAppointmentsOnDate(date) && (
                          <div className="absolute bottom-2 flex gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          </div>
                        )}
                      </div>
                    ),
                  }}
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 h-full",
                    month: "space-y-4 w-full flex-1",
                    table: "w-full h-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground w-full h-12 font-normal text-[0.8rem] flex items-center justify-center",
                    row: "flex w-full mt-2",
                    cell: "relative w-full h-24 p-0.5 hover:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-full w-full p-2 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center justify-center text-base rounded-md",
                    day_today: "bg-accent/70 text-accent-foreground font-bold",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_outside: "text-muted-foreground opacity-50",
                  }}
                />
              </Suspense>
            </Card>

            <Card className="p-4">
              <h2 className="font-semibold mb-4">
                Rendez-vous du {selectedDate.toLocaleDateString("fr-FR")}
              </h2>
              <DailyAppointments
                appointments={dailyAppointments}
                selectedDate={selectedDate}
              />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card className="p-4">
            <AppointmentsList
              appointments={mockAppointments}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          </Card>
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
