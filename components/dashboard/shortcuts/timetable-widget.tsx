'use client';

import { useCallback, useMemo, useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Calendar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
} from '@/components/ui';
import { cn } from '@/src/lib';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronRightIcon } from 'lucide-react';

type AppointmentStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  client: {
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  service: {
    name: string;
  };
}

const appointmentStatusConfig = {
  CONFIRMED: {
    label: 'Confirmé',
    className: 'bg-green-100 text-green-800',
  },
  PENDING: {
    label: 'En attente',
    className: 'bg-orange-100 text-orange-800',
  },
  CANCELLED: {
    label: 'Annulé',
    className: 'bg-red-100 text-red-800',
  },
} as const;

// Données factices pour les rendez-vous
const MOCK_APPOINTMENTS: Record<string, Appointment[]> = {
  [format(new Date(), 'yyyy-MM-dd')]: [
    {
      id: '1',
      startTime: format(new Date().setHours(9, 0), "yyyy-MM-dd'T'HH:mm:ss"),
      endTime: format(new Date().setHours(10, 0), "yyyy-MM-dd'T'HH:mm:ss"),
      status: 'CONFIRMED',
      client: {
        firstName: 'Sophie',
        lastName: 'Martin',
        avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      service: {
        name: 'Toilettage complet',
      },
    },
    {
      id: '2',
      startTime: format(new Date().setHours(14, 30), "yyyy-MM-dd'T'HH:mm:ss"),
      endTime: format(new Date().setHours(15, 30), "yyyy-MM-dd'T'HH:mm:ss"),
      status: 'PENDING',
      client: {
        firstName: 'Thomas',
        lastName: 'Dubois',
        avatarUrl: null,
      },
      service: {
        name: 'Consultation vétérinaire',
      },
    },
  ],
  [format(addDays(new Date(), 1), 'yyyy-MM-dd')]: [
    {
      id: '3',
      startTime: format(
        addDays(new Date(), 1).setHours(11, 0),
        "yyyy-MM-dd'T'HH:mm:ss"
      ),
      endTime: format(
        addDays(new Date(), 1).setHours(12, 0),
        "yyyy-MM-dd'T'HH:mm:ss"
      ),
      status: 'CONFIRMED',
      client: {
        firstName: 'Marie',
        lastName: 'Petit',
        avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      service: {
        name: 'Coupe des griffes',
      },
    },
  ],
  [format(subDays(new Date(), 1), 'yyyy-MM-dd')]: [
    {
      id: '4',
      startTime: format(
        subDays(new Date(), 1).setHours(16, 0),
        "yyyy-MM-dd'T'HH:mm:ss"
      ),
      endTime: format(
        subDays(new Date(), 1).setHours(17, 0),
        "yyyy-MM-dd'T'HH:mm:ss"
      ),
      status: 'CANCELLED',
      client: {
        firstName: 'Lucas',
        lastName: 'Bernard',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      service: {
        name: 'Bain thérapeutique',
      },
    },
  ],
};

const TimetableWidget = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Récupération des rendez-vous pour la date sélectionnée
  const appointments =
    MOCK_APPOINTMENTS[format(selectedDate, 'yyyy-MM-dd')] ?? [];

  // Mémorisation des rendez-vous triés par heure
  const sortedAppointments = useMemo(() => {
    return [...appointments].sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }, [appointments]);

  // Gestionnaire de changement de date
  const handleDateSelect = useCallback((date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  return (
    <Card className='h-full rounded-2xl border border-border'>
      <CardHeader className='pb-2'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>
            Planning des rendez-vous
          </CardTitle>
          <Button variant='ghost' size='sm' className='gap-2'>
            <span>Voir tout</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        <Calendar
          mode='single'
          selected={selectedDate}
          onSelect={handleDateSelect}
          today={new Date()}
          locale={fr}
          className='flex h-full w-full'
          classNames={{
            months:
              'flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1',
            month: 'space-y-4 w-full flex flex-col',
            table: 'w-full h-full border-collapse space-y-1',
            head_row: 'h-12',
            row: 'w-full mt-2',
            cell: cn(
              'h-9 w-9 text-center text-sm p-0 relative',
              '[&:has([aria-selected])]:bg-primary/5',
              'first:[&:has([aria-selected])]:rounded-l-md',
              'last:[&:has([aria-selected])]:rounded-r-md',
              'focus-within:relative focus-within:z-20',
              '[&:has(.appointment-day)]:bg-primary/5',
              '[&:has(.appointment-day)]:font-medium'
            ),
            day: cn(
              'h-9 w-9 p-0 font-normal',
              'aria-selected:opacity-100',
              'hover:bg-primary/10 hover:rounded-md transition-colors',
              'focus:bg-primary/10 focus:rounded-md focus:ring-0',
              'disabled:opacity-50 disabled:pointer-events-none'
            ),
            day_selected: 'bg-primary text-primary-foreground rounded-md',
            day_today: 'bg-accent text-accent-foreground rounded-md',
          }}
        />
      </CardContent>

      <div className='divide-y border-t'>
        <ScrollArea className='h-[300px]'>
          {sortedAppointments.length === 0 ? (
            <div className='flex flex-col items-center justify-center p-8 text-center text-muted-foreground'>
              <CalendarIcon className='h-12 w-12 mb-4 opacity-50' />
              <p className='text-sm'>Aucun rendez-vous prévu pour cette date</p>
            </div>
          ) : (
            sortedAppointments.map((appointment) => (
              <Card key={appointment.id} className='border-none'>
                <CardContent className='flex items-center p-4 rounded-2xl'>
                  <Avatar className='size-10'>
                    <AvatarImage
                      src={appointment.client.avatarUrl ?? undefined}
                    />
                    <AvatarFallback>
                      {appointment.client.firstName[0]}
                      {appointment.client.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className='ms-4 space-y-2 flex-1'>
                    <p className='font-medium leading-none'>
                      {appointment.service.name}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {appointment.client.firstName}{' '}
                      {appointment.client.lastName} à{' '}
                      {format(new Date(appointment.startTime), 'HH:mm')}
                      {'-'}
                      {format(new Date(appointment.endTime), 'HH:mm')}
                    </p>
                  </div>
                  <Badge
                    variant='secondary'
                    className={cn(
                      'ml-auto px-3 py-1',
                      appointmentStatusConfig[
                        appointment.status as AppointmentStatus
                      ].className
                    )}
                  >
                    {
                      appointmentStatusConfig[
                        appointment.status as AppointmentStatus
                      ].label
                    }
                  </Badge>
                </CardContent>
              </Card>
            ))
          )}
        </ScrollArea>
      </div>
    </Card>
  );
};

export default TimetableWidget;
