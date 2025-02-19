'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { CalendarDays, Clock, Filter, MapPin, Euro } from 'lucide-react';
import { useState } from 'react';

// Types pour nos données
type Reservation = {
  id: string;
  type: string;
  tag: string;
  doctor: {
    name: string;
    clinic: string;
    avatar: string;
  };
  date: string;
  time: string;
  location: string;
  price: number;
  status: 'completed' | 'cancelled' | 'upcoming';
  pet: {
    name: string;
    avatar: string;
    reason: string;
  };
};

// Données factices
const fakeReservations: Reservation[] = [
  {
    id: '1',
    type: 'Consultation vétérinaire',
    tag: 'Vaccin',
    doctor: {
      name: 'Dr. Jenny Akwar',
      clinic: 'Cabinet Vetcare',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    date: '15 Mars 2024',
    time: '17:00-18:00',
    location: 'Paris 15ème',
    price: 65,
    status: 'completed',
    pet: {
      name: 'Luna',
      avatar: '/images/pets/persian-cat.jpg',
      reason: 'Vaccin annuel • Rappel',
    },
  },
  {
    id: '2',
    type: 'Consultation urgente',
    tag: 'Urgence',
    doctor: {
      name: 'Dr. Halbert Duort',
      clinic: 'Clinique 24/7',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    },
    date: '10 Mars 2024',
    time: '14:00-15:00',
    location: 'Paris 12ème',
    price: 95,
    status: 'cancelled',
    pet: {
      name: 'Max',
      avatar: '/images/pets/german-shepherd.jpg',
      reason: 'Perte d\'appétit • Consultation urgente',
    },
  },
];

const ReservationItem = ({ reservation }: { reservation: Reservation }) => {
  const statusStyles = {
    completed: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    cancelled: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    upcoming: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  };

  const statusText = {
    completed: 'Terminé',
    cancelled: 'Annulé',
    upcoming: 'À venir',
  };

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <div className='group relative rounded-lg border bg-card p-3 hover:bg-accent/50 transition-colors'>
          <div className={`absolute left-0 top-0 w-1 h-full ${reservation.status === 'completed' ? 'bg-green-500/50' : 'bg-red-500/50'} rounded-l-lg`}></div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Avatar className='size-10'>
                <AvatarImage src={reservation.doctor.avatar} />
                <AvatarFallback>{reservation.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <div className='flex items-center gap-2 mb-0.5'>
                  <p className='font-medium'>{reservation.type}</p>
                  <Badge variant='secondary' className='text-xs'>{reservation.tag}</Badge>
                </div>
                <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                  <span>{reservation.doctor.name}</span>
                  <span>•</span>
                  <div className='flex items-center gap-1'>
                    <Clock className='size-3.5' />
                    <span>{reservation.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <Badge variant='outline' className={statusStyles[reservation.status]}>
                {statusText[reservation.status]}
              </Badge>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Avatar className='size-6'>
                  <AvatarImage src={reservation.pet.avatar} />
                  <AvatarFallback>{reservation.pet.name[0]}</AvatarFallback>
                </Avatar>
                <span>{reservation.pet.name}</span>
              </div>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Détails de la réservation</SheetTitle>
          <SheetDescription>
            <div className="space-y-6 mt-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarImage src={reservation.doctor.avatar} />
                  <AvatarFallback>{reservation.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{reservation.doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{reservation.doctor.clinic}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Informations de la consultation</h4>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      <span>{reservation.date} • {reservation.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-muted-foreground" />
                      <span>{reservation.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="size-4 text-muted-foreground" />
                      <span>{reservation.price}€</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Animal</h4>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage src={reservation.pet.avatar} />
                      <AvatarFallback>{reservation.pet.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{reservation.pet.name}</p>
                      <p className="text-sm text-muted-foreground">{reservation.pet.reason}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

const ClientHistoryReservationWidget = () => {
  return (
    <Card className='h-full rounded-2xl'>
      <CardHeader>
        <div className='flex items-center justify-between mb-4'>
          <CardTitle className='flex items-center gap-2'>
            <CalendarDays className='size-5' />
            Historique des réservations
          </CardTitle>
          <Button variant='outline' size='sm' className='gap-1.5'>
            <Filter className='size-4' />
            Filtrer
          </Button>
        </div>
        <Tabs defaultValue='all' className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='all'>Tout</TabsTrigger>
            <TabsTrigger value='upcoming'>À venir</TabsTrigger>
            <TabsTrigger value='past'>Passées</TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='mt-4'>
            <ScrollArea className='h-[400px]'>
              <div className='space-y-4'>
                {fakeReservations.map((reservation) => (
                  <ReservationItem key={reservation.id} reservation={reservation} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};

export default ClientHistoryReservationWidget;
