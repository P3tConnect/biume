'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import {
  ClipboardList,
  Thermometer,
  Weight,
  Calendar,
  Heart,
  Pill,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

const ClientObservationsWidget = () => {
  return (
    <Card className='h-full rounded-2xl border border-border bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <ClipboardList className='size-5' />
            Observations & Suivi
          </CardTitle>
          <div className='text-sm text-muted-foreground'>
            Dernière mise à jour: 15 Mars 2024
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[400px] pr-4'>
          <div className='space-y-6'>
            <div className='group relative rounded-xl border bg-card p-4 hover:bg-accent/50 transition-colors'>
              <div className='absolute left-0 top-0 w-1 h-full bg-green-500/50 rounded-l-xl'></div>
              <div className='flex items-center gap-3 mb-4'>
                <Avatar className='size-10 ring-2 ring-green-500/20'>
                  <AvatarImage src='/images/pets/persian-cat.jpg' />
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='font-medium'>Luna</p>
                      <Badge
                        variant='outline'
                        className='bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                      >
                        Vaccin
                      </Badge>
                    </div>
                    <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                      <Calendar className='size-3.5' />
                      15 Mars 2024
                    </div>
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                    <p className='text-sm text-muted-foreground'>
                      Dr. Jenny Akwar
                    </p>
                    <ChevronRight className='size-3 text-muted-foreground' />
                    <p className='text-sm text-muted-foreground'>
                      Cabinet Vetcare
                    </p>
                  </div>
                </div>
              </div>
              <div className='space-y-3'>
                <p className='text-sm'>
                  Vaccination annuelle effectuée. Chat en bonne santé générale.
                </p>
                <div className='grid gap-2 rounded-lg bg-muted/50 p-3'>
                  <TooltipProvider>
                    <div className='flex items-center gap-2 text-sm'>
                      <Weight className='size-4 text-muted-foreground' />
                      <Tooltip>
                        <TooltipTrigger className='flex items-center gap-1'>
                          <span>Poids stable :</span>
                          <span className='font-medium'>3.5 kg</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Pas de variation depuis la dernière visite</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <Thermometer className='size-4 text-muted-foreground' />
                      <Tooltip>
                        <TooltipTrigger className='flex items-center gap-1'>
                          <span>Température normale :</span>
                          <span className='font-medium'>38.5°C</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Température corporelle dans la normale</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <Calendar className='size-4 text-muted-foreground' />
                      <Tooltip>
                        <TooltipTrigger className='flex items-center gap-1'>
                          <span>Prochain rappel :</span>
                          <span className='font-medium'>Mars 2025</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Vaccin annuel à renouveler dans 12 mois</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            <div className='group relative rounded-xl border bg-card p-4 hover:bg-accent/50 transition-colors'>
              <div className='absolute left-0 top-0 w-1 h-full bg-red-500/50 rounded-l-xl'></div>
              <div className='flex items-center gap-3 mb-4'>
                <Avatar className='size-10 ring-2 ring-red-500/20'>
                  <AvatarImage src='/images/pets/german-shepherd.jpg' />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='font-medium'>Max</p>
                      <Badge
                        variant='outline'
                        className='bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                      >
                        Consultation
                      </Badge>
                    </div>
                    <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                      <Calendar className='size-3.5' />
                      10 Mars 2024
                    </div>
                  </div>
                  <div className='flex items-center gap-2 mt-1'>
                    <p className='text-sm text-muted-foreground'>
                      Dr. Halbert Duort
                    </p>
                    <ChevronRight className='size-3 text-muted-foreground' />
                    <p className='text-sm text-muted-foreground'>
                      Clinique 24/7
                    </p>
                  </div>
                </div>
              </div>
              <div className='space-y-3'>
                <div className='rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400 font-medium flex items-center gap-2'>
                  <AlertTriangle className='size-4' />
                  <span>Attention particulière requise</span>
                </div>
                <p className='text-sm'>
                  Perte d&apos;appétit depuis 3 jours. Examen clinique révèle
                  une légère déshydratation.
                </p>
                <div className='grid gap-2 rounded-lg bg-muted/50 p-3'>
                  <TooltipProvider>
                    <div className='flex items-center gap-2 text-sm'>
                      <Weight className='size-4 text-muted-foreground' />
                      <Tooltip>
                        <TooltipTrigger className='flex items-center gap-1'>
                          <span>Poids en baisse :</span>
                          <span className='font-medium text-red-500'>
                            32 kg (-2 kg)
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Perte de poids significative à surveiller</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <Thermometer className='size-4 text-muted-foreground' />
                      <Tooltip>
                        <TooltipTrigger className='flex items-center gap-1'>
                          <span>Température élevée :</span>
                          <span className='font-medium text-red-500'>
                            39.2°C
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Légère fièvre à surveiller</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <Pill className='size-4 text-muted-foreground' />
                      <Tooltip>
                        <TooltipTrigger className='flex items-center gap-1'>
                          <span>Prescription :</span>
                          <span className='font-medium'>
                            Antiémétique + Réhydratation
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Traitement à suivre pendant 5 jours</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
                <div className='flex items-center gap-2 text-sm text-muted-foreground border-l-2 border-muted pl-3'>
                  <Heart className='size-4' />
                  <span>
                    Suivi recommandé dans 48h si pas d&apos;amélioration
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ClientObservationsWidget;
