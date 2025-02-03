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

const ClientHistoryReservationWidget = () => {
  return (
    <Card className='h-full rounded-2xl border border-border bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50'>
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
                <div className='group relative rounded-lg border bg-card p-4 hover:bg-accent/50 transition-colors'>
                  <div className='absolute left-0 top-0 w-1 h-full bg-green-500/50 rounded-l-lg'></div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-start justify-between'>
                      <div className='flex items-start gap-4'>
                        <Avatar className='size-12 ring-2 ring-green-500/20'>
                          <AvatarImage src='https://randomuser.me/api/portraits/men/42.jpg' />
                          <AvatarFallback>JA</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='flex items-center gap-2'>
                            <p className='font-medium'>
                              Consultation vétérinaire
                            </p>
                            <Badge variant='secondary'>Vaccin</Badge>
                          </div>
                          <p className='text-sm text-muted-foreground mt-1'>
                            Dr. Jenny Akwar • Cabinet Vetcare
                          </p>
                          <div className='flex items-center gap-4 mt-2 text-sm text-muted-foreground'>
                            <div className='flex items-center gap-1.5'>
                              <Clock className='size-3.5' />
                              <span>15 Mars 2024 • 17:00-18:00</span>
                            </div>
                            <Separator orientation='vertical' className='h-3' />
                            <div className='flex items-center gap-1.5'>
                              <MapPin className='size-3.5' />
                              <span>Paris 15ème</span>
                            </div>
                            <Separator orientation='vertical' className='h-3' />
                            <div className='flex items-center gap-1.5'>
                              <Euro className='size-3.5' />
                              <span>65€</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant='outline'
                              className='bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                            >
                              Terminé
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Consultation effectuée avec succès</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Separator className='bg-border/50' />
                    <div className='flex items-center gap-3'>
                      <Avatar className='size-8 ring-1 ring-border'>
                        <AvatarImage src='/images/pets/persian-cat.jpg' />
                        <AvatarFallback>L</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-sm font-medium'>Luna</p>
                        <p className='text-xs text-muted-foreground'>
                          Vaccin annuel • Rappel
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='group relative rounded-lg border bg-card p-4 hover:bg-accent/50 transition-colors'>
                  <div className='absolute left-0 top-0 w-1 h-full bg-red-500/50 rounded-l-lg'></div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-start justify-between'>
                      <div className='flex items-start gap-4'>
                        <Avatar className='size-12 ring-2 ring-red-500/20'>
                          <AvatarImage src='https://randomuser.me/api/portraits/men/55.jpg' />
                          <AvatarFallback>HD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='flex items-center gap-2'>
                            <p className='font-medium'>Consultation urgente</p>
                            <Badge variant='destructive'>Annulé</Badge>
                          </div>
                          <p className='text-sm text-muted-foreground mt-1'>
                            Dr. Halbert Duort • Clinique 24/7
                          </p>
                          <div className='flex items-center gap-4 mt-2 text-sm text-muted-foreground'>
                            <div className='flex items-center gap-1.5'>
                              <Clock className='size-3.5' />
                              <span>10 Mars 2024 • 14:00-15:00</span>
                            </div>
                            <Separator orientation='vertical' className='h-3' />
                            <div className='flex items-center gap-1.5'>
                              <MapPin className='size-3.5' />
                              <span>Paris 12ème</span>
                            </div>
                            <Separator orientation='vertical' className='h-3' />
                            <div className='flex items-center gap-1.5'>
                              <Euro className='size-3.5' />
                              <span>95€</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className='text-xs text-red-500 font-medium'>
                              Annulé par le client
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Annulation effectuée le 9 Mars 2024</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Separator className='bg-border/50' />
                    <div className='flex items-center gap-3'>
                      <Avatar className='size-8 ring-1 ring-border'>
                        <AvatarImage src='/images/pets/german-shepherd.jpg' />
                        <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-sm font-medium'>Max</p>
                        <p className='text-xs text-muted-foreground'>
                          Perte d&apos;appétit • Consultation urgente
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};

export default ClientHistoryReservationWidget;
