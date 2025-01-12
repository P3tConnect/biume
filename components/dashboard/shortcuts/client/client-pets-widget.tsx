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
  Progress,
} from '@/components/ui';
import { PawPrint, Plus } from 'lucide-react';

const ClientPetsWidget = () => {
  return (
    <Card className='h-full rounded-2xl border border-border'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='flex items-center gap-2'>
          <PawPrint className='size-5' />
          Mes animaux
        </CardTitle>
        <Button variant='outline' size='sm' className='gap-1'>
          <Plus className='size-4' />
          Ajouter
        </Button>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='rounded-lg border p-3 hover:bg-muted/50 transition-colors'>
            <div className='flex items-center gap-4'>
              <Avatar className='size-12'>
                <AvatarImage src='/images/pets/persian-cat.jpg' />
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <p className='font-medium leading-none'>Luna</p>
                  <Badge variant='secondary' className='font-normal'>
                    Chat Persan
                  </Badge>
                </div>
                <p className='text-sm text-muted-foreground mt-1'>
                  1 an • Femelle • 3.5 kg
                </p>
                <div className='mt-2'>
                  <div className='flex justify-between text-xs mb-1'>
                    <span className='text-muted-foreground'>
                      Prochain vaccin
                    </span>
                    <span className='text-muted-foreground'>15 Avril 2024</span>
                  </div>
                  <Progress value={65} className='h-1.5' />
                </div>
              </div>
            </div>
          </div>

          <div className='rounded-lg border p-3 hover:bg-muted/50 transition-colors'>
            <div className='flex items-center gap-4'>
              <Avatar className='size-12'>
                <AvatarImage src='/images/pets/german-shepherd.jpg' />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <p className='font-medium leading-none'>Max</p>
                  <Badge variant='secondary' className='font-normal'>
                    Berger Allemand
                  </Badge>
                </div>
                <p className='text-sm text-muted-foreground mt-1'>
                  5 ans • Mâle • 32 kg
                </p>
                <div className='mt-2'>
                  <div className='flex justify-between text-xs mb-1'>
                    <span className='text-muted-foreground'>
                      Prochain vaccin
                    </span>
                    <span className='text-red-500'>Dépassé (10j)</span>
                  </div>
                  <Progress value={100} className='h-1.5' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientPetsWidget;
