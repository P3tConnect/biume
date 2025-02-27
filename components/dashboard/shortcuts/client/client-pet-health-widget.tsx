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
  Progress,
  Button,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui';
import { Heart, Syringe, Weight, AlertTriangle, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/src/lib/auth-client';
import { useState } from 'react';

// Types
type HealthMetric = {
  label: string;
  value: number;
  target: number;
  unit: string;
  status: 'good' | 'warning' | 'alert';
};

type PetHealth = {
  id: string;
  name: string;
  avatar: string;
  age: string;
  nextVaccination: string;
  lastCheckup: string;
  metrics: HealthMetric[];
  alerts: string[];
};

// Données de test
const petsHealth: PetHealth[] = [
  {
    id: '1',
    name: 'Luna',
    avatar: '/images/pets/persian-cat.jpg',
    age: '3 ans',
    nextVaccination: '15 Avril 2024',
    lastCheckup: '15 Mars 2024',
    metrics: [
      {
        label: 'Poids',
        value: 3.5,
        target: 4,
        unit: 'kg',
        status: 'warning',
      },
      {
        label: 'Activité',
        value: 85,
        target: 100,
        unit: '%',
        status: 'good',
      },
    ],
    alerts: [
      'Vaccination antirabique à renouveler dans 30 jours',
      'Légère perte de poids à surveiller',
    ],
  },
  {
    id: '2',
    name: 'Max',
    avatar: '/images/pets/german-shepherd.jpg',
    age: '5 ans',
    nextVaccination: '10 Mai 2024',
    lastCheckup: '10 Mars 2024',
    metrics: [
      {
        label: 'Poids',
        value: 32,
        target: 30,
        unit: 'kg',
        status: 'alert',
      },
      {
        label: 'Activité',
        value: 60,
        target: 100,
        unit: '%',
        status: 'warning',
      },
    ],
    alerts: [
      'Surpoids - Régime recommandé',
      'Augmenter l\'activité physique',
    ],
  },
];

const ClientPetHealthWidget = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [selectedPet, setSelectedPet] = useState<PetHealth | null>(null);

  const getStatusColor = (status: HealthMetric['status']) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'alert': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getProgressColor = (status: HealthMetric['status']) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'alert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Card className='rounded-xl'>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='flex items-center gap-2'>
            <Heart className='size-5' />
            Suivi santé
          </CardTitle>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => router.push(`/dashboard/user/${userId}/pets`)}
          >
            Voir tout
            <ChevronRight className='size-4 ml-1' />
          </Button>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {petsHealth.map((pet) => (
              <div
                key={pet.id}
                className='flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer'
                onClick={() => setSelectedPet(pet)}
              >
                <Avatar className='size-12 border-2 border-background'>
                  <AvatarImage src={pet.avatar} alt={pet.name} />
                  <AvatarFallback>{pet.name[0]}</AvatarFallback>
                </Avatar>

                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-medium truncate'>{pet.name}</h3>
                    {pet.alerts.length > 0 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger onClick={(e) => e.stopPropagation()}>
                            <Badge variant='outline' className='shrink-0 gap-1'>
                              <AlertTriangle className='size-3 text-yellow-500' />
                              {pet.alerts.length}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <ul className='text-xs space-y-1'>
                              {pet.alerts.map((alert, index) => (
                                <li key={index}>{alert}</li>
                              ))}
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  <div className='flex gap-4 mt-1 text-xs text-muted-foreground'>
                    <div className='flex items-center gap-1'>
                      <Syringe className='size-3' />
                      <span className='truncate'>Vaccin : {pet.nextVaccination}</span>
                    </div>
                    {pet.metrics.find(m => m.label === 'Poids') && (
                      <div className='flex items-center gap-1'>
                        <Weight className='size-3' />
                        <span>{pet.metrics.find(m => m.label === 'Poids')?.value} kg</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Sheet open={!!selectedPet} onOpenChange={() => setSelectedPet(null)}>
        <SheetContent className="overflow-y-auto">
          {selectedPet && (
            <>
              <SheetHeader className="space-y-4">
                <div className='flex items-center gap-4'>
                  <Avatar className='size-16 border-2 border-background'>
                    <AvatarImage src={selectedPet.avatar} alt={selectedPet.name} />
                    <AvatarFallback>{selectedPet.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{selectedPet.name}</SheetTitle>
                    <SheetDescription>{selectedPet.age}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className='mt-6 space-y-6'>
                <div className='space-y-4'>
                  <h4 className='text-sm font-medium'>Métriques de santé</h4>
                  {selectedPet.metrics.map((metric, index) => (
                    <div key={index} className='space-y-2'>
                      <div className='flex items-center justify-between text-sm'>
                        <span className='flex items-center gap-2'>
                          {metric.label === 'Poids' ? (
                            <Weight className='size-4' />
                          ) : (
                            <Heart className='size-4' />
                          )}
                          {metric.label}
                        </span>
                        <span className={getStatusColor(metric.status)}>
                          {metric.value} / {metric.target} {metric.unit}
                        </span>
                      </div>
                      <Progress
                        value={(metric.value / metric.target) * 100}
                        className='h-2'
                        indicatorClassName={getProgressColor(metric.status)}
                      />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className='space-y-4'>
                  <h4 className='text-sm font-medium'>Suivi vétérinaire</h4>
                  <div className='grid gap-2 text-sm'>
                    <div className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>Prochain vaccin</span>
                      <span>{selectedPet.nextVaccination}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>Dernier checkup</span>
                      <span>{selectedPet.lastCheckup}</span>
                    </div>
                  </div>
                </div>

                {selectedPet.alerts.length > 0 && (
                  <>
                    <Separator />
                    <div className='space-y-4'>
                      <h4 className='text-sm font-medium flex items-center gap-2'>
                        <AlertTriangle className='size-4 text-yellow-500' />
                        Points d'attention
                      </h4>
                      <ul className='space-y-2'>
                        {selectedPet.alerts.map((alert, index) => (
                          <li key={index} className='text-sm text-muted-foreground flex items-center gap-2'>
                            <span className='size-1.5 rounded-full bg-yellow-500' />
                            {alert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ClientPetHealthWidget; 