'use client';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import StepperAnimal from './stepper-animal';

const TitlePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              <DialogTrigger asChild>
                <Button className='flex items-center justify-center text-center gap-2'>
                  <Plus className='size-4' />
                  Ajouter un animal
                </Button>
              </DialogTrigger>
            </div>
          </div>
        </CardHeader>
      </Card>
      <DialogContent className='max-h-[90vh] w-full max-w-4xl overflow-y-auto'>
        <VisuallyHidden>
          <DialogTitle>Ajouter un animal</DialogTitle>
        </VisuallyHidden>
        <div className='p-4'>
          <StepperAnimal />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TitlePage;
