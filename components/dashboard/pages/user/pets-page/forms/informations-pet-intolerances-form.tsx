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

const InformationsPetIntolerancesForm = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const intolerancesOptions = [
    { label: 'Lactose', value: 'lactose' },
    { label: 'Gluten', value: 'gluten' },
    { label: 'Certaines protéines', value: 'proteins' },
  ];

  return (
    <Form {...form}>
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
    </Form>
  );
};

export default InformationsPetIntolerancesForm;
