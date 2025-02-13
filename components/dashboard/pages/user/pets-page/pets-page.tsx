'use client';

import { Button } from '@/components/ui/button';
import { Plus, Dog, Cat, Bird } from 'lucide-react';
import { PetCard } from './components/pet-card';
import { Pet } from '@/src/db';

// Données de démonstration
const mockPets = [
  {
    id: '1',
    name: 'Luna',
    type: 'Chat',
    breed: 'Maine Coon',
    birthDate: '2020-05-15',
    weight: 6.5,
    gender: 'female' as const,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
  },
  {
    id: '2',
    name: 'Max',
    type: 'Chien',
    breed: 'Golden Retriever',
    birthDate: '2019-03-20',
    weight: 32,
    gender: 'male' as const,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
  },
  {
    id: '3',
    name: 'Rocky',
    type: 'Chien',
    breed: 'Berger Allemand',
    birthDate: '2021-08-10',
    weight: 28,
    gender: 'male' as const,
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95',
  },
  {
    id: '4',
    name: 'Milo',
    type: 'Chat',
    breed: 'Siamois',
    birthDate: '2022-01-05',
    weight: 4,
    gender: 'male' as const,
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26',
  },
  {
    id: '5',
    name: 'Nala',
    type: 'Chat',
    breed: 'British Shorthair',
    birthDate: '2021-11-30',
    weight: 5,
    gender: 'female' as const,
    image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
  },
  {
    id: '6',
    name: 'Charlie',
    type: 'Chien',
    breed: 'Labrador',
    birthDate: '2020-09-15',
    weight: 30,
    gender: 'male' as const,
    image: 'https://images.unsplash.com/photo-1605897472359-85e4b94d685d',
  },
];

const stats = [
  {
    name: 'Chiens',
    value: '2',
    icon: Dog,
  },
  {
    name: 'Chats',
    value: '3',
    icon: Cat,
  },
  {
    name: 'Oiseaux',
    value: '1',
    icon: Bird,
  },
];

const PetsPage = () => {
  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {mockPets.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet as unknown as Pet}
            onEdit={(id) => console.log('Edit', id)}
            onDelete={(id) => console.log('Delete', id)}
          />
        ))}
      </div>

      {mockPets.length === 0 && (
        <div className='flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center'>
          <div className='rounded-full bg-primary/10 p-3'>
            <Plus className='size-6 text-primary' />
          </div>
          <div className='max-w-md space-y-1'>
            <h3 className='text-lg font-semibold'>Aucun animal</h3>
            <p className='text-sm text-muted-foreground'>
              Vous n&apos;avez pas encore ajouté d&apos;animal. Commencez par en ajouter
              un !
            </p>
          </div>
          <Button className='flex items-center gap-2'>
            <Plus className='size-4' />
            Ajouter un animal
          </Button>
        </div>
      )}
    </div>
  );
};

export default PetsPage;
