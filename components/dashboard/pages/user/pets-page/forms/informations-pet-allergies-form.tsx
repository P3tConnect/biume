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

const InformationsPetAllergiesForm = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const allergiesOptions = [
    { label: 'Pollen', value: 'pollen' },
    { label: 'Acariens', value: 'dust_mites' },
    { label: 'Certains aliments', value: 'food' },
  ];

  return (
    <Form {...form}>
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
    </Form>
  );
};

export default InformationsPetAllergiesForm;
