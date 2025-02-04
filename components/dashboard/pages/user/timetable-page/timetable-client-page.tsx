'use client';

import { Suspense, useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar as CalendarIcon, List, Clock } from 'lucide-react';
import { DailyAppointments } from '@/components/dashboard/pages/pro/timetable-page/daily-appointments';
import {
  AppointmentForm,
  AppointmentFormData,
} from '@/components/dashboard/pages/pro/timetable-page/appointment-form';
import Calendar from '@/components/dashboard/pages/pro/timetable-page/calendar';
import { cn } from '@/src/lib/utils';
import { Badge } from '@/components/ui/badge';

// Données temporaires pour la démonstration
const mockAppointments = [
  {
    id: '1',
    clientName: 'Jean Dupont',
    date: new Date(),
    time: '09:00',
    duration: 30,
    status: 'confirmed' as const,
    notes: 'Premier rendez-vous',
  },
  {
    id: '2',
    clientName: 'Marie Martin',
    date: new Date(),
    time: '10:30',
    duration: 45,
    status: 'pending' as const,
  },
  {
    id: '3',
    clientName: 'Pierre Durand',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: '14:00',
    duration: 60,
    status: 'confirmed' as const,
  },
];

const DashboardUserTimetablePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<AppointmentFormData | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const handleAddAppointment = (data: AppointmentFormData) => {
    // TODO: Implémenter l'ajout d'un rendez-vous
    console.log('Nouveau rendez-vous:', data);
  };

  const handleEditAppointment = (appointment: AppointmentFormData) => {
    setEditingAppointment(appointment);
    setIsFormOpen(true);
  };

  const handleDeleteAppointment = (appointment: AppointmentFormData) => {
    // TODO: Implémenter la suppression d'un rendez-vous
    console.log('Supprimer le rendez-vous:', appointment);
  };

  const dailyAppointments = mockAppointments.filter(
    (apt) => apt.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className='h-full w-full flex flex-col'>
      {/* Header */}
      <div className='pb-2'>
        <Card className='overflow-hidden rounded-2xl'>
          <CardHeader className='border-b border-gray-100 dark:border-gray-800 py-3'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
              <div>
                <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
                  Planification
                </CardTitle>
                <p className='text-sm text-muted-foreground'>
                  Gérez vos rendez-vous et votre emploi du temps
                </p>
              </div>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-1 bg-muted/50 p-1 rounded-lg'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setView('calendar')}
                    className={cn(
                      'h-8 rounded-md transition-colors',
                      view === 'calendar' && 'bg-background shadow-sm'
                    )}
                  >
                    <CalendarIcon className='h-4 w-4 mr-2' />
                    Calendrier
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setView('list')}
                    className={cn(
                      'h-8 rounded-md transition-colors',
                      view === 'list' && 'bg-background shadow-sm'
                    )}
                  >
                    <List className='h-4 w-4 mr-2' />
                    Liste
                  </Button>
                </div>
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className='rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300'
                >
                  <Clock className='mr-2 h-4 w-4' />
                  Nouveau rendez-vous
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-hidden pb-4'>
        {view === 'calendar' ? (
          <div className='grid grid-cols-1 md:grid-cols-[1fr_350px] gap-4 h-full'>
            <Card className='rounded-xl overflow-hidden'>
              <div className='h-full'>
                <Suspense
                  fallback={
                    <div className='p-8 text-center'>
                      Chargement du calendrier...
                    </div>
                  }
                >
                  <Calendar />
                </Suspense>
              </div>
            </Card>

            <div className='flex flex-col gap-4 h-full'>
              <Card className='rounded-xl overflow-hidden h-1/2'>
                <div className='p-3 border-b'>
                  <h2 className='font-medium'>
                    Rendez-vous du {selectedDate.toLocaleDateString('fr-FR')}
                  </h2>
                </div>
                <div className='flex-1 overflow-hidden'>
                  <DailyAppointments
                    appointments={dailyAppointments}
                    selectedDate={selectedDate}
                  />
                </div>
              </Card>

              <Card className='rounded-xl overflow-hidden h-1/2'>
                <div className='p-3 border-b'>
                  <h2 className='font-medium'>Prochains rendez-vous</h2>
                </div>
                <div className='flex-1 overflow-y-auto p-3'>
                  <div className='space-y-2'>
                    {mockAppointments
                      .filter((apt) => new Date(apt.date) > new Date())
                      .sort(
                        (a, b) =>
                          new Date(a.date).getTime() -
                          new Date(b.date).getTime()
                      )
                      .slice(0, 3)
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className='flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors'
                        >
                          <div className='space-y-1'>
                            <p className='font-medium'>
                              {appointment.clientName}
                            </p>
                            <div className='flex items-center text-sm text-muted-foreground'>
                              <Clock className='mr-1 h-3 w-3' />
                              <span>
                                {new Date(appointment.date).toLocaleDateString(
                                  'fr-FR'
                                )}{' '}
                                à {appointment.time}
                              </span>
                            </div>
                          </div>
                          <Badge
                            className={cn(
                              'ml-auto text-xs',
                              appointment.status === 'confirmed'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : appointment.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            )}
                          >
                            {appointment.status === 'confirmed'
                              ? 'Confirmé'
                              : appointment.status === 'pending'
                                ? 'En attente'
                                : 'Annulé'}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <Card className='rounded-xl h-full'>
            <div className='p-4'>
              <div className='max-w-5xl mx-auto'>
                {/* TODO: Implement list view */}
                <div className='text-center text-muted-foreground py-8'>
                  Vue liste en cours de développement
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

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

export default DashboardUserTimetablePage;
