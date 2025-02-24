'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { deseaseSchema } from '../schema/pet-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type FormData = {
  deseases: string[];
};

const InformationsPetDeseasesForm = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const diseasesOptions = [
    { label: 'Diabète', value: 'diabetes' },
    { label: 'Arthrite', value: 'arthritis' },
    { label: 'Problèmes cardiaques', value: 'heart_problems' },
    { label: 'Problèmes respiratoires', value: 'respiratory_problems' },
    { label: 'Problèmes digestifs', value: 'digestive_problems' },
    { label: 'Problèmes musculaires', value: 'muscular_problems' },
    { label: 'Problèmes dermatologiques', value: 'dermatological_problems' },
    { label: 'Problèmes endocriniennes', value: 'endocrine_problems' },
    { label: 'Problèmes immunologiques', value: 'immunological_problems' },
    { label: 'Autre', value: 'other' },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(deseaseSchema),
    defaultValues: {
      deseases: [],
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='deseases'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sélectionnez les maladies</FormLabel>
            <div className='grid grid-cols-2 gap-4'>
              {diseasesOptions.map((disease) => (
                <FormField
                  key={disease.value}
                  control={form.control}
                  name='deseases'
                  render={({ field: innerField }) => (
                    <FormItem
                      key={disease.value}
                      className='flex flex-row items-start space-x-3 space-y-0'
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(disease.value)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...field.value, disease.value]
                              : field.value.filter(
                                  (value) => value !== disease.value
                                );
                            field.onChange(updatedValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className='font-normal'>
                        {disease.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default InformationsPetDeseasesForm;
