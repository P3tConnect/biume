'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Calendar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  ScrollArea,
} from '@/components/ui';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from 'react';

const ClientTimetableWidget = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className='rounded-xl'>
      <CardHeader className='border-b border-border pb-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <CardTitle className='flex items-center gap-2 text-lg font-medium'>
              <CalendarDays className='size-5' />
              Planning des rendez-vous
            </CardTitle>
            <p className='text-sm text-muted-foreground capitalize'>
              {date ? format(date, 'MMMM yyyy', { locale: fr }) : ''}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='space-y-6'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='w-full flex justify-center items-center'
            classNames={{
              months: 'flex flex-col items-center w-full',
              month: 'w-full max-w-full',
              head_row: 'flex w-full justify-center',
              head_cell:
                'text-muted-foreground rounded-md w-14 font-normal text-[0.8rem]',
              row: 'flex w-full justify-center mt-2',
              cell: 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent',
              day: 'h-14 w-14 p-0 font-normal text-foreground aria-selected:opacity-100 hover:bg-accent rounded-md text-base',
              day_today: 'bg-accent text-accent-foreground',
              day_selected:
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
              day_outside: 'text-muted-foreground opacity-50',
              day_disabled: 'text-muted-foreground opacity-50',
              day_hidden: 'invisible',
            }}
          />

          <ScrollArea className='h-[300px] pr-4'>
            <div className='space-y-4'>
              {appointments.map((appointment, index) => (
                <div key={index} className='group'>
                  <div className='rounded-lg border bg-card p-3'>
                    <div className='flex items-center gap-4'>
                      <Badge
                        variant='outline'
                        className={`rounded-lg px-2.5 py-1 font-medium ${
                          appointment.status === 'en_attente'
                            ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-500'
                            : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                        }`}
                      >
                        <Clock className='size-3 mr-1.5 inline-block' />
                        {appointment.time}
                      </Badge>
                      <div className='flex-1 min-w-0 space-y-3'>
                        <div className='flex items-center justify-between'>
                          <div>
                            <p className='font-medium'>{appointment.title}</p>
                            <div className='flex items-center gap-3 mt-1'>
                              <p className='text-sm text-muted-foreground'>
                                {appointment.doctor}
                              </p>
                              <Separator
                                orientation='vertical'
                                className='h-3'
                              />
                              <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                                <MapPin className='size-3' />
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Avatar className='size-6 ring-1 ring-border'>
                              <AvatarImage
                                src={appointment.petAvatar}
                                className='object-cover'
                              />
                              <AvatarFallback>
                                {appointment.petInitial}
                              </AvatarFallback>
                            </Avatar>
                            <span className='text-sm text-muted-foreground'>
                              {appointment.petName}
                            </span>
                          </div>
                          <Badge
                            variant='outline'
                            className={`font-medium ${
                              appointment.status === 'en_attente'
                                ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-500'
                                : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                            }`}
                          >
                            {appointment.status === 'en_attente'
                              ? 'En attente'
                              : 'Confirmé'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

const appointments = [
  {
    time: '09:00-10:00',
    title: 'Toilettage complet',
    doctor: 'Sophie Martin',
    location: 'Paris 15ème',
    status: 'confirmé',
    petName: 'Luna',
    petAvatar: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    petInitial: 'L',
  },
  {
    time: '09:00-10:00',
    title: 'Toilettage complet',
    doctor: 'Sophie Martin',
    location: 'Paris 15ème',
    status: 'confirmé',
    petName: 'Luna',
    petAvatar: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    petInitial: 'L',
  },
  {
    time: '09:00-10:00',
    title: 'Toilettage complet',
    doctor: 'Sophie Martin',
    location: 'Paris 15ème',
    status: 'confirmé',
    petName: 'Luna',
    petAvatar: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    petInitial: 'L',
  },
  {
    time: '09:00-10:00',
    title: 'Toilettage complet',
    doctor: 'Sophie Martin',
    location: 'Paris 15ème',
    status: 'confirmé',
    petName: 'Luna',
    petAvatar: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    petInitial: 'L',
  },
  {
    time: '09:00-10:00',
    title: 'Toilettage complet',
    doctor: 'Sophie Martin',
    location: 'Paris 15ème',
    status: 'confirmé',
    petName: 'Luna',
    petAvatar: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    petInitial: 'L',
  },
  {
    time: '09:00-10:00',
    title: 'Toilettage complet',
    doctor: 'Sophie Martin',
    location: 'Paris 15ème',
    status: 'confirmé',
    petName: 'Luna',
    petAvatar: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    petInitial: 'L',
  },
  {
    time: '09:00-10:00',
    title: 'Toilettage complet',
    doctor: 'Sophie Martin',
    location: 'Paris 15ème',
    status: 'confirmé',
    petName: 'Luna',
    petAvatar: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    petInitial: 'L',
  },
  {
    time: '09:00-10:00',
    title: 'Toilettage complet',
    doctor: 'Sophie Martin',
    location: 'Paris 15ème',
    status: 'confirmé',
    petName: 'Luna',
    petAvatar: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    petInitial: 'L',
  },
  {
    time: '09:00-10:00',
    title: 'Toilettage complet',
    doctor: 'Sophie Martin',
    location: 'Paris 15ème',
    status: 'confirmé',
    petName: 'Luna',
    petAvatar: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    petInitial: 'L',
  },
  {
    time: '09:00-10:00',
    title: 'Toilettage complet',
    doctor: 'Sophie Martin',
    location: 'Paris 15ème',
    status: 'confirmé',
    petName: 'Luna',
    petAvatar: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    petInitial: 'L',
  },
  {
    time: '14:30-15:30',
    title: 'Consultation vétérinaire',
    doctor: 'Thomas Dubois',
    location: 'Paris 12ème',
    status: 'en_attente',
    petName: 'Max',
    petAvatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
    petInitial: 'M',
  },
];

export default ClientTimetableWidget;
