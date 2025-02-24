'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { allergiesSchema } from '../schema/pet-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui';

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

  type FormData = {
    allergies: string[];
  };

  const form = useForm<FormData>({
    resolver: zodResolver(allergiesSchema),
    defaultValues: {
      allergies: [],
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='allergies'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sélectionnez les allergies</FormLabel>
            <FormControl></FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
};

export default InformationsPetAllergiesForm;
