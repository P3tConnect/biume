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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Separator,
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
  Building,
  User,
} from 'lucide-react';
import { useState } from 'react';

const observations = [
  {
    id: 1,
    petName: 'Luna',
    petImage: '/images/pets/persian-cat.jpg',
    type: 'Vaccin',
    date: '15 Mars 2024',
    veterinarian: 'Dr. Jenny Akwar',
    clinic: 'Cabinet Vetcare',
    description: 'Vaccination annuelle effectuée. Chat en bonne santé générale.',
    badgeColor: 'green',
    details: {
      weight: '3.5 kg',
      temperature: '38.5°C',
      nextAppointment: 'Mars 2025',
      prescription: 'Aucune prescription nécessaire',
      notes: [
        'Comportement normal',
        'Appétit excellent',
        'Vaccination contre la rage effectuée',
        'Prochain rappel dans 12 mois'
      ]
    }
  },
  {
    id: 2,
    petName: 'Max',
    petImage: '/images/pets/german-shepherd.jpg',
    type: 'Consultation',
    date: '10 Mars 2024',
    veterinarian: 'Dr. Halbert Duort',
    clinic: 'Clinique 24/7',
    description: 'Perte d\'appétit depuis 3 jours. Traitement prescrit.',
    badgeColor: 'red',
    details: {
      weight: '32 kg (-2kg)',
      temperature: '39.2°C',
      nextAppointment: '12 Mars 2024',
      prescription: 'Antiémétique + Réhydratation',
      notes: [
        'Déshydratation légère',
        'Perte d\'appétit depuis 3 jours',
        'Suivi nécessaire dans 48h',
        'Surveillance de la température recommandée'
      ]
    }
  },
  {
    id: 3,
    petName: 'Rocky',
    petImage: '/images/pets/golden-retriever.jpg',
    type: 'Contrôle',
    date: '5 Mars 2024',
    veterinarian: 'Dr. Marie Dupont',
    clinic: 'Clinique des Alpes',
    description: 'Contrôle de routine. Tout va bien.',
    badgeColor: 'blue',
    details: {
      weight: '28 kg',
      temperature: '38.7°C',
      nextAppointment: 'Septembre 2024',
      prescription: 'Renouvellement antiparasitaire',
      notes: [
        'État général satisfaisant',
        'Traitement antiparasitaire renouvelé',
        'Prochain contrôle dans 6 mois',
        'Activité physique à maintenir'
      ]
    }
  }
];

const ClientObservationsWidget = () => {
  return (
    <Card className='h-full rounded-2xl border border-border'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <ClipboardList className='size-5' />
            Rapports & Suivi
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[400px] pr-4'>
          <div className='space-y-4'>
            {observations.map((observation) => (
              <Sheet key={observation.id}>
                <SheetTrigger className='w-full text-left'>
                  <div
                    className='group relative rounded-xl border bg-card p-4 hover:bg-accent/50 transition-colors'
                  >
                    <div className={`absolute left-0 top-0 w-1 h-full bg-${observation.badgeColor}-500/50 rounded-l-xl`}></div>
                    <div className='flex items-center gap-3 mb-2'>
                      <Avatar className='size-10'>
                        <AvatarImage src={observation.petImage} />
                        <AvatarFallback>{observation.petName[0]}</AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-2'>
                            <p className='font-medium'>{observation.petName}</p>
                            <Badge
                              variant='outline'
                              className={`bg-${observation.badgeColor}-500/10 text-${observation.badgeColor}-600 border-${observation.badgeColor}-500/20`}
                            >
                              {observation.type}
                            </Badge>
                          </div>
                          <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                            <Calendar className='size-3.5' />
                            {observation.date}
                          </div>
                        </div>
                        <p className='text-sm text-muted-foreground mt-1'>
                          {observation.veterinarian} • {observation.clinic}
                        </p>
                      </div>
                    </div>
                    <p className='text-sm'>{observation.description}</p>
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Détails de la consultation</SheetTitle>
                  </SheetHeader>
                  <div className='mt-6 space-y-6'>
                    {/* En-tête avec informations de base */}
                    <div className='flex items-center gap-4'>
                      <Avatar className='size-16'>
                        <AvatarImage src={observation.petImage} />
                        <AvatarFallback>{observation.petName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className='text-lg font-semibold'>{observation.petName}</h3>
                        <Badge
                          variant='outline'
                          className={`mt-1 bg-${observation.badgeColor}-500/10 text-${observation.badgeColor}-600 border-${observation.badgeColor}-500/20`}
                        >
                          {observation.type}
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Informations sur la consultation */}
                    <div className='grid gap-4'>
                      <div className='flex items-center gap-2 text-sm'>
                        <Calendar className='size-4 text-muted-foreground' />
                        <span>Date de consultation :</span>
                        <span className='font-medium'>{observation.date}</span>
                      </div>
                      <div className='flex items-center gap-2 text-sm'>
                        <User className='size-4 text-muted-foreground' />
                        <span>Vétérinaire :</span>
                        <span className='font-medium'>{observation.veterinarian}</span>
                      </div>
                      <div className='flex items-center gap-2 text-sm'>
                        <Building className='size-4 text-muted-foreground' />
                        <span>Clinique :</span>
                        <span className='font-medium'>{observation.clinic}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Mesures */}
                    <div className='grid gap-4'>
                      <div className='flex items-center gap-2 text-sm'>
                        <Weight className='size-4 text-muted-foreground' />
                        <span>Poids :</span>
                        <span className='font-medium'>{observation.details.weight}</span>
                      </div>
                      <div className='flex items-center gap-2 text-sm'>
                        <Thermometer className='size-4 text-muted-foreground' />
                        <span>Température :</span>
                        <span className='font-medium'>{observation.details.temperature}</span>
                      </div>
                      <div className='flex items-center gap-2 text-sm'>
                        <Calendar className='size-4 text-muted-foreground' />
                        <span>Prochain rendez-vous :</span>
                        <span className='font-medium'>{observation.details.nextAppointment}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Prescription */}
                    <div>
                      <div className='flex items-center gap-2 mb-2'>
                        <Pill className='size-4 text-muted-foreground' />
                        <span className='font-medium'>Prescription</span>
                      </div>
                      <p className='text-sm text-muted-foreground'>{observation.details.prescription}</p>
                    </div>

                    {/* Notes */}
                    <div>
                      <div className='flex items-center gap-2 mb-2'>
                        <ClipboardList className='size-4 text-muted-foreground' />
                        <span className='font-medium'>Notes</span>
                      </div>
                      <ul className='space-y-2'>
                        {observation.details.notes.map((note, index) => (
                          <li key={index} className='text-sm text-muted-foreground flex items-start gap-2'>
                            <span className='mt-1.5 size-1.5 rounded-full bg-muted-foreground/70' />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ClientObservationsWidget;
