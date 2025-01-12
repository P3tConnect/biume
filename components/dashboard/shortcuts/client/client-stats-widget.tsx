'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { CalendarDays, Clock, PawPrint, Users2 } from 'lucide-react';

const ClientStatsWidget = () => {
  return (
    <Card className='h-full rounded-2xl border border-border'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Clock className='size-5' />
          Statistiques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 grid-cols-2'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <CalendarDays className='size-4 text-muted-foreground' />
              <p className='text-sm text-muted-foreground'>
                Réservations totales
              </p>
            </div>
            <div className='flex items-baseline gap-2'>
              <p className='text-2xl font-bold'>12</p>
              <p className='text-xs text-muted-foreground'>derniers 30 jours</p>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Clock className='size-4 text-muted-foreground' />
              <p className='text-sm text-muted-foreground'>
                Réservations à venir
              </p>
            </div>
            <div className='flex items-baseline gap-2'>
              <p className='text-2xl font-bold'>3</p>
              <p className='text-xs text-green-500'>+2 cette semaine</p>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <PawPrint className='size-4 text-muted-foreground' />
              <p className='text-sm text-muted-foreground'>Animaux actifs</p>
            </div>
            <div className='flex items-baseline gap-2'>
              <p className='text-2xl font-bold'>2</p>
              <p className='text-xs text-muted-foreground'>sur 5 max</p>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Users2 className='size-4 text-muted-foreground' />
              <p className='text-sm text-muted-foreground'>
                Professionnels consultés
              </p>
            </div>
            <div className='flex items-baseline gap-2'>
              <p className='text-2xl font-bold'>4</p>
              <p className='text-xs text-muted-foreground'>vétérinaires</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientStatsWidget;
