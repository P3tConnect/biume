'use client';

import { Pet } from '@/src/db';
import { ActionResult } from '@/src/lib';
import React, { use } from 'react';
import { PetCard } from './pet-card';
import { PawPrint } from 'lucide-react';

const PetsGrid = ({ pets }: { pets: Promise<ActionResult<Pet[]>> }) => {
  const petsResult = use(pets);

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {petsResult.data?.length === 0 ? (
        <div className='col-span-full flex flex-col items-center justify-center gap-4 py-12'>
          <div className='flex flex-col items-center relative rounded-full bg-muted-foreground/40 p-6 dark:bg-muted-foreground'>
            <PawPrint className='h-12 w-12 text-white' />
          </div>
          <div className='flex flex-col items-center gap-2'>
            <p className='text-sm text-center text-muted-foreground'>
              Vous n&apos;avez pas encore d&apos;animaux enregistrés
            </p>
          </div>
        </div>
      ) : (
        petsResult.data?.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            onDelete={async () => {
              // await fetchPets();
            }}
          />
        ))
      )}
    </div>
  );
};

export default PetsGrid;
