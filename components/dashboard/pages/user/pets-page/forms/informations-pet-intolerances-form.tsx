'use client';

import React from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  FormControl,
} from '@/components/ui';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { intolerencesSchema } from '../schema/pet-schema';
import { createPetIntolerances } from '@/src/actions';
import { useActionMutation } from '@/src/hooks/action-hooks';
import { toast } from 'sonner';
import { usePetContext } from '../context/pet-context';

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
  const { petId } = usePetContext();

  const intolerancesOptions = [
    { label: 'Lactose', value: 'lactose' },
    { label: 'Gluten', value: 'gluten' },
    { label: 'Certaines protéines', value: 'proteins' },
    { label: 'Certains additifs', value: 'additives' },
    { label: 'Certains conservateurs', value: 'preservatives' },
    { label: 'Autre', value: 'other' },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(intolerencesSchema),
    defaultValues: {
      intolerences: [],
    },
  });

  const { mutateAsync } = useActionMutation(createPetIntolerances, {
    onSuccess: () => {
      toast.success('Intolérances enregistrées avec succès!');
      nextStep();
    },
    onError: (error) => {
      toast.error(
        `Erreur lors de l'enregistrement des intolérances: ${error.message}`
      );
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (!petId) {
      toast.error("Erreur : ID de l'animal non trouvé");
      return;
    }

    await mutateAsync({
      petId,
      allergies: data.intolerences,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-6'>
        <FormField
          control={form.control}
          name='intolerences'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sélectionnez les intolérances</FormLabel>
              <div className='grid grid-cols-2 gap-4'>
                {intolerancesOptions.map((intolerance) => (
                  <FormField
                    key={intolerance.value}
                    control={form.control}
                    name='intolerences'
                    render={({ field: innerField }) => (
                      <FormItem
                        key={intolerance.value}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(intolerance.value)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...field.value, intolerance.value]
                                : field.value.filter(
                                    (value) => value !== intolerance.value
                                  );
                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {intolerance.label}
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

        <div className='flex justify-end gap-2'>
          <Button variant='outline' onClick={previousStep}>
            Retour
          </Button>
          <Button type='submit'>Suivant</Button>
        </div>
      </form>
    </Form>
  );
};

export default InformationsPetIntolerancesForm;
