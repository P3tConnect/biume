'use client';

import { Button, Card, CardHeader, CardTitle } from '@/components/ui';
import { Plus } from 'lucide-react';
import React from 'react';

const TitlePage = () => {
  return (
    <Card className='overflow-hidden rounded-2xl mb-4'>
      <CardHeader className='border-b border-gray-100 dark:border-gray-800'>
        <div className='flex flex-row justify-between items-center gap-4'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div>
              <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
                Mes animaux
              </CardTitle>
              <p className='text-sm text-muted-foreground'>
                Gérez le profil de vos animaux de compagnie
              </p>
            </div>
          </div>
          <div className='flex items-end justify-end'>
            <Button className='flex items-center gap-2'>
              <Plus className='size-4' />
              Ajouter un animal
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default TitlePage;
