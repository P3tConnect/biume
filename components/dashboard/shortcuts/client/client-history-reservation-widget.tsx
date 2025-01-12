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
  Separator,
} from '@/components/ui';
import { CalendarDays, Clock, Filter } from 'lucide-react';

const ClientHistoryReservationWidget = () => {
  return (
    <Card className='h-full rounded-2xl border border-border'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <CalendarDays className='size-5' />
            Historique des réservations
          </CardTitle>
          <Button variant='outline' size='sm' className='gap-1'>
            <Filter className='size-4' />
            Filtrer
          </Button>
        </div>
        {/* <Tabs defaultValue='all' className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='all'>Tout</TabsTrigger>
            <TabsTrigger value='upcoming'>À venir</TabsTrigger>
            <TabsTrigger value='past'>Passées</TabsTrigger>
          </TabsList>
        </Tabs> */}
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='rounded-lg border p-4 hover:bg-muted/50 transition-colors'>
            <div className='flex flex-row justify-between items-start gap-4'>
              <div className='flex items-start gap-4'>
                <Avatar className='size-12 ring-2 ring-green-500/20'>
                  <AvatarImage src='https://randomuser.me/api/portraits/men/42.jpg' />
                  <AvatarFallback>JA</AvatarFallback>
                </Avatar>
                <div>
                  <div className='flex items-center gap-2'>
                    <p className='font-medium leading-none'>
                      Consultation vétérinaire
                    </p>
                    <Badge variant='secondary'>Vaccin</Badge>
                  </div>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Dr. Jenny Akwar • Cabinet Vetcare
                  </p>
                  <div className='flex items-center gap-2 mt-1 text-sm text-muted-foreground'>
                    <Clock className='size-3' />
                    15 Mars 2024 • 17:00-18:00
                  </div>
                  <Separator className='my-3' />
                  <div className='flex items-center gap-3'>
                    <Avatar className='size-8'>
                      <AvatarImage src='/images/pets/persian-cat.jpg' />
                      <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium leading-none'>Luna</p>
                      <p className='text-xs text-muted-foreground mt-0.5'>
                        Vaccin annuel • Rappel
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Badge variant='secondary' className='mt-1'>
                Terminé
              </Badge>
            </div>
          </div>

          <div className='rounded-lg border p-4 hover:bg-muted/50 transition-colors'>
            <div className='flex flex-row justify-between items-start gap-4'>
              <div className='flex items-start gap-4'>
                <Avatar className='size-12 ring-2 ring-red-500/20'>
                  <AvatarImage src='https://randomuser.me/api/portraits/men/55.jpg' />
                  <AvatarFallback>HD</AvatarFallback>
                </Avatar>
                <div>
                  <div className='flex items-center gap-2'>
                    <p className='font-medium leading-none'>
                      Consultation urgente
                    </p>
                    <Badge variant='destructive'>Annulé</Badge>
                  </div>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Dr. Halbert Duort • Clinique 24/7
                  </p>
                  <div className='flex items-center gap-2 mt-1 text-sm text-muted-foreground'>
                    <Clock className='size-3' />
                    10 Mars 2024 • 14:00-15:00
                  </div>
                  <Separator className='my-3' />
                  <div className='flex items-center gap-3'>
                    <Avatar className='size-8'>
                      <AvatarImage src='/images/pets/german-shepherd.jpg' />
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium leading-none'>Max</p>
                      <p className='text-xs text-muted-foreground mt-0.5'>
                        Perte d&apos;appétit • Consultation urgente
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className='text-xs text-red-500'>Annulé par le client</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientHistoryReservationWidget;
