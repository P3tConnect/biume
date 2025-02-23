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

interface InformationsPetDiseasesFormProps {
  form: UseFormReturn<z.infer<typeof petSchema>>;
}

const InformationsPetDiseasesForm = ({
  form,
}: InformationsPetDiseasesFormProps) => {
  // Ces options devraient venir de votre base de données
  const diseasesOptions = [
    { label: 'Diabète', value: 'diabetes' },
    { label: 'Arthrite', value: 'arthritis' },
    { label: 'Problèmes cardiaques', value: 'heart_problems' },
    // Ajoutez d'autres maladies selon vos besoins
  ];

  return (
    <Form {...form}>
      <Card>
        <CardContent className='pt-6 space-y-4'>
          <FormField
            control={form.control}
            name='diseases'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sélectionnez les maladies</FormLabel>
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

export default InformationsPetDiseasesForm;
