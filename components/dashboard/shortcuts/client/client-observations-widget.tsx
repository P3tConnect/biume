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
} from '@/components/ui';
import { ClipboardList } from 'lucide-react';

const ClientObservationsWidget = () => {
  return (
    <Card className='h-full rounded-2xl border border-border'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <ClipboardList className='size-5' />
          Observations & Suivi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[400px] pr-4'>
          <div className='space-y-4'>
            <div className='rounded-lg border p-4'>
              <div className='flex items-center gap-3 mb-3'>
                <Avatar className='size-8'>
                  <AvatarImage src='/images/pets/persian-cat.jpg' />
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-medium leading-none'>Luna</p>
                    <Badge variant='outline' className='font-normal'>
                      Vaccin
                    </Badge>
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    15 Mars 2024 • Dr. Jenny Akwar
                  </p>
                </div>
              </div>
              <div className='space-y-2 text-sm'>
                <p>
                  Vaccination annuelle effectuée. Chat en bonne santé générale.
                </p>
                <div className='pl-4 border-l-2 border-muted space-y-1'>
                  <p>• Poids stable : 3.5 kg</p>
                  <p>• Température normale : 38.5°C</p>
                  <p>• Prochain rappel dans 12 mois</p>
                </div>
              </div>
            </div>

            <div className='rounded-lg border p-4'>
              <div className='flex items-center gap-3 mb-3'>
                <Avatar className='size-8'>
                  <AvatarImage src='/images/pets/german-shepherd.jpg' />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-medium leading-none'>Max</p>
                    <Badge variant='outline' className='font-normal'>
                      Consultation
                    </Badge>
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    10 Mars 2024 • Dr. Halbert Duort
                  </p>
                </div>
              </div>
              <div className='space-y-2 text-sm'>
                <p className='text-red-500 font-medium'>
                  ⚠️ Attention particulière requise
                </p>
                <p>
                  Perte d&apos;appétit depuis 3 jours. Examen clinique révèle
                  une légère déshydratation.
                </p>
                <div className='pl-4 border-l-2 border-muted space-y-1'>
                  <p>• Poids en baisse : 32 kg (-2 kg)</p>
                  <p>• Température légèrement élevée : 39.2°C</p>
                  <p>• Prescription : Antiémétique + Réhydratation</p>
                </div>
                <p className='text-muted-foreground italic'>
                  Suivi recommandé dans 48h si pas d&apos;amélioration
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ClientObservationsWidget;
