'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { CalendarDays, MapPin, Clock, ChevronRight, User2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/src/lib/auth-client';
import { useState } from 'react';

// Types
type Appointment = {
  id: string;
  type: string;
  date: string;
  time: string;
  location: string;
  provider: {
    name: string;
    avatar: string;
    specialty: string;
  };
  pet: {
    name: string;
    avatar: string;
  };
  status: 'confirmed' | 'pending';
};

// Données de test
const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    type: 'Consultation vétérinaire',
    date: '22 Mars 2024',
    time: '14:30',
    location: 'Cabinet Vetcare - Paris 15',
    provider: {
      name: 'Dr. Sophie Martin',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      specialty: 'Vétérinaire',
    },
    pet: {
      name: 'Luna',
      avatar: '/images/pets/persian-cat.jpg',
    },
    status: 'confirmed',
  },
  {
    id: '2',
    type: 'Toilettage',
    date: '25 Mars 2024',
    time: '10:00',
    location: 'Salon Beautiful Pets - Paris 12',
    provider: {
      name: 'Marie Dubois',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      specialty: 'Toiletteuse',
    },
    pet: {
      name: 'Max',
      avatar: '/images/pets/german-shepherd.jpg',
    },
    status: 'pending',
  },
];

const ClientUpcomingAppointmentsWidget = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  return (
    <>
      <Card className='rounded-xl'>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='flex items-center gap-2'>
            <CalendarDays className='size-5' />
            Prochains rendez-vous
          </CardTitle>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => router.push(`/dashboard/user/${userId}/timetable`)}
          >
            Voir tout
            <ChevronRight className='size-4 ml-1' />
          </Button>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className='flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer'
                onClick={() => setSelectedAppointment(appointment)}
              >
                <Avatar className='size-12 border-2 border-background'>
                  <AvatarImage src={appointment.pet.avatar} alt={appointment.pet.name} />
                  <AvatarFallback>{appointment.pet.name[0]}</AvatarFallback>
                </Avatar>

                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-medium truncate'>{appointment.type}</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger onClick={(e) => e.stopPropagation()}>
                          <Badge
                            variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                            className='shrink-0'
                          >
                            {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className='text-xs'>
                            {appointment.status === 'confirmed'
                              ? 'Rendez-vous confirmé'
                              : 'En attente de confirmation'}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className='flex gap-3 mt-1 text-xs text-muted-foreground'>
                    <div className='flex items-center gap-1'>
                      <Clock className='size-3' />
                      <span className='truncate'>{appointment.date}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <User2 className='size-3' />
                      <span className='truncate'>{appointment.provider.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {upcomingAppointments.length === 0 && (
              <div className='text-center py-4 text-sm text-muted-foreground'>
                <p>Aucun rendez-vous à venir</p>
                <Button
                  variant='link'
                  size='sm'
                  className='mt-1'
                  onClick={() => router.push(`/dashboard/user/${userId}/reservations`)}
                >
                  Prendre un rendez-vous
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Sheet open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <SheetContent className="overflow-y-auto">
          {selectedAppointment && (
            <>
              <SheetHeader className="space-y-4">
                <div className='flex items-center gap-4'>
                  <Avatar className='size-16 border-2 border-background'>
                    <AvatarImage src={selectedAppointment.pet.avatar} alt={selectedAppointment.pet.name} />
                    <AvatarFallback>{selectedAppointment.pet.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{selectedAppointment.type}</SheetTitle>
                    <SheetDescription>Pour {selectedAppointment.pet.name}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className='mt-6 space-y-6'>
                <div className='space-y-4'>
                  <h4 className='text-sm font-medium'>Détails du rendez-vous</h4>
                  <div className='grid gap-3 text-sm'>
                    <div className='flex items-center gap-2'>
                      <Clock className='size-4 text-muted-foreground' />
                      <div>
                        <p className='font-medium'>{selectedAppointment.date}</p>
                        <p className='text-muted-foreground'>{selectedAppointment.time}</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <MapPin className='size-4 text-muted-foreground' />
                      <div>
                        <p className='font-medium'>Lieu</p>
                        <p className='text-muted-foreground'>{selectedAppointment.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className='space-y-4'>
                  <h4 className='text-sm font-medium'>Professionnel</h4>
                  <div className='flex items-center gap-3'>
                    <Avatar className='size-12'>
                      <AvatarImage src={selectedAppointment.provider.avatar} alt={selectedAppointment.provider.name} />
                      <AvatarFallback>{selectedAppointment.provider.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium'>{selectedAppointment.provider.name}</p>
                      <p className='text-sm text-muted-foreground'>{selectedAppointment.provider.specialty}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className='flex justify-between items-center'>
                  <Badge
                    variant={selectedAppointment.status === 'confirmed' ? 'default' : 'secondary'}
                    className='text-sm'
                  >
                    {selectedAppointment.status === 'confirmed' ? 'Rendez-vous confirmé' : 'En attente de confirmation'}
                  </Badge>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => router.push(`/dashboard/user/${userId}/appointments/${selectedAppointment.id}`)}
                  >
                    Gérer le rendez-vous
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ClientUpcomingAppointmentsWidget; 