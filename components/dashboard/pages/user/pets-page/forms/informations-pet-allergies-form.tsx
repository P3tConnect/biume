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

interface InformationsPetAllergiesFormProps {
  form: UseFormReturn<z.infer<typeof petSchema>>;
}

const InformationsPetAllergiesForm = ({
  form,
}: InformationsPetAllergiesFormProps) => {
  const allergiesOptions = [
    { label: 'Pollen', value: 'pollen' },
    { label: 'Acariens', value: 'dust_mites' },
    { label: 'Certains aliments', value: 'food' },
  ];

  return (
    <Form {...form}>
      <Card>
        <CardContent className='pt-6 space-y-4'>
          <FormField
            control={form.control}
            name='allergies'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sélectionnez les allergies</FormLabel>
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

export default InformationsPetAllergiesForm;
