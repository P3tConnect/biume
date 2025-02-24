'use client';

import React from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { intolerencesSchema } from '../schema/pet-schema';

type FormData = {
  intolerences: string[];
};

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

  const form = useForm<FormData>({
    resolver: zodResolver(intolerencesSchema),
    defaultValues: {
      intolerences: [],
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='intolerences'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sélectionnez les intolérances</FormLabel>
            {intolerancesOptions.map((option) => (
              <FormItem key={option.value}>
                <Select>
                  <SelectTrigger>
                    <SelectContent>
                      {intolerancesOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </FormItem>
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default InformationsPetIntolerancesForm;
