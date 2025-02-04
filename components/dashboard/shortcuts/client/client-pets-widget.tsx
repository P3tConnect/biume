'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  ScrollArea,
} from '@/components/ui';
import { cn } from '@/src/lib';
import { PawPrint, Plus, Pencil, Calendar, Weight } from 'lucide-react';
import { useState } from 'react';

const pets = [
  {
    id: '1',
    name: 'Luna',
    image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    type: 'Chat',
    breed: 'Persan',
    birthDate: '2023-02-03',
    weight: 3.5,
    gender: 'female' as const,
  },
  {
    id: '2',
    name: 'Max',
    image: 'https://images.unsplash.com/photo-1605897472359-85e4b94d685d',
    type: 'Chien',
    breed: 'Berger Allemand',
    birthDate: '2019-02-03',
    weight: 32,
    gender: 'male' as const,
  },
  {
    id: '3',
    name: 'Milo',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26',
    type: 'Chat',
    breed: 'Maine Coon',
    birthDate: '2022-05-15',
    weight: 7.2,
    gender: 'male' as const,
  },
  {
    id: '4',
    name: 'Ruby',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95',
    type: 'Chien',
    breed: 'Golden Retriever',
    birthDate: '2021-08-20',
    weight: 28,
    gender: 'female' as const,
  },
  {
    id: '5',
    name: 'Oscar',
    image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    type: 'Chat',
    breed: 'British Shorthair',
    birthDate: '2020-11-30',
    weight: 5.5,
    gender: 'male' as const,
  },
  {
    id: '6',
    name: 'Bella',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
    type: 'Chien',
    breed: 'Bouledogue Français',
    birthDate: '2022-03-10',
    weight: 12,
    gender: 'female' as const,
  },
];

const PetCard = ({ pet }: { pet: (typeof pets)[0] }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const getAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const monthDiff = today.getMonth() - birth.getMonth();
    let age = today.getFullYear() - birth.getFullYear();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <Card className='group overflow-hidden'>
      <div className='relative h-[280px]'>
        <div className='absolute inset-0'>
          {pet.image ? (
            <img
              src={pet.image}
              alt={pet.name}
              className={cn(
                'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              )}
            />
          ) : (
            <div className='flex h-full items-center justify-center bg-muted'>
              <PawPrint className='h-24 w-24 text-muted-foreground/20' />
            </div>
          )}
        </div>

        {/* Overlay avec dégradé */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent' />

        {/* Boutons d'action */}
        <div className='absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <Button
            size='icon'
            variant='secondary'
            className='h-8 w-8 rounded-full'
          >
            <Pencil className='h-4 w-4' />
          </Button>
        </div>

        {/* Informations principales */}
        <div className='absolute bottom-0 left-0 right-0 p-4'>
          <div className='mb-4 space-y-1'>
            <div className='flex items-center gap-2'>
              <Badge variant='secondary' className='bg-white/10 text-white'>
                {pet.type}
              </Badge>
              {pet.gender && (
                <div
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-base font-semibold',
                    pet.gender === 'female' ? 'text-pink-400' : 'text-blue-400'
                  )}
                >
                  {pet.gender === 'female' ? '♀' : '♂'}
                </div>
              )}
            </div>
            <h3 className='text-2xl font-bold text-white'>{pet.name}</h3>
            {pet.breed && <p className='text-sm text-white/80'>{pet.breed}</p>}
          </div>

          {/* Stats */}
          <div className='grid grid-cols-2 gap-3'>
            {pet.birthDate && (
              <div className='flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-1.5 text-sm text-white backdrop-blur-sm'>
                <Calendar className='h-4 w-4' />
                <span>{getAge(pet.birthDate)} ans</span>
              </div>
            )}
            {pet.weight && (
              <div className='flex items-center gap-2 rounded-md bg-white/10 px-2.5 py-1.5 text-sm text-white backdrop-blur-sm'>
                <Weight className='h-4 w-4' />
                <span>{pet.weight} kg</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

const ClientPetsWidget = () => {
  return (
    <Card className='relative overflow-hidden rounded-xl'>
      <CardHeader className='relative border-b border-white/5 pb-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <CardTitle className='flex items-center gap-2 text-lg font-medium text-white'>
              <PawPrint className='size-5' />
              Mes animaux
            </CardTitle>
            <p className='text-sm'>{pets.length} animaux enregistrés</p>
          </div>
          <Button
            variant='ghost'
            size='icon'
            className='size-9 border border-white/40 rounded-xl'
          >
            <Plus className='size-5' />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='p-4 pt-6'>
        <ScrollArea className='h-[600px] pr-4'>
          <div className='grid grid-cols-2 gap-4'>
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ClientPetsWidget;
