'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { petSchema } from '../hooks/useStepperAnimal';

interface InformationsPetIntolerancesFormProps {
  form: UseFormReturn<z.infer<typeof petSchema>>;
}

const InformationsPetIntolerancesForm = ({
  form,
}: InformationsPetIntolerancesFormProps) => {
  // Ces options devraient venir de votre base de données
  const intolerancesOptions = [
    { label: 'Lactose', value: 'lactose' },
    { label: 'Gluten', value: 'gluten' },
    { label: 'Certaines protéines', value: 'proteins' },
    // Ajoutez d'autres intolérances selon vos besoins
  ];

  return (
    <Form {...form}>
      <Card>
        <CardContent className='pt-6 space-y-4'>
          <FormField
            control={form.control}
            name='intolerances'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sélectionnez les intolérances</FormLabel>
                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </Form>
  );
};

export default InformationsPetIntolerancesForm;
