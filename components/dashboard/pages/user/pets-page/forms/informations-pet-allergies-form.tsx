'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { petSchema } from '../schema/pet-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Button,
  FormMessage,
} from '@/components/ui';
import { Checkbox } from '@/components/ui/checkbox';
import { createPetAllergies } from '@/src/actions';
import { useActionMutation } from '@/src/hooks/action-hooks';
import { toast } from 'sonner';
import { usePetContext } from '../context/pet-context';
import { z } from 'zod';

const InformationsPetAllergiesForm = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const { petId } = usePetContext();

  const allergiesOptions = [
    { label: 'Pollen', value: 'pollen' },
    { label: 'Acariens', value: 'dust_mites' },
    { label: 'Certains aliments', value: 'food' },
    { label: 'Certains médicaments', value: 'medications' },
    { label: 'Certains produits chimiques', value: 'chemicals' },
    { label: 'Autre', value: 'other' },
  ];

  const form = useForm<z.infer<typeof petSchema>>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      allergies: [],
    },
  });

  const { mutateAsync } = useActionMutation(createPetAllergies, {
    onSuccess: () => {
      toast.success('Allergies enregistrées avec succès!');
      nextStep();
    },
    onError: (error) => {
      toast.error(
        `Erreur lors de l'enregistrement des allergies: ${error.message}`
      );
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (!petId) {
      toast.error("Erreur : ID de l'animal non trouvé");
      return;
    }

    await mutateAsync({
      allergies: data.allergies ?? [],
      pets: petId,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-6'>
        <FormField
          control={form.control}
          name='allergies'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sélectionnez les allergies</FormLabel>
              <div className='grid grid-cols-2 gap-4'>
                {allergiesOptions.map((allergy) => (
                  <FormField
                    key={allergy.value}
                    control={form.control}
                    name='allergies'
                    render={({ field: innerField }) => (
                      <FormItem
                        key={allergy.value}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(allergy.value)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...field.value, allergy.value]
                                : field.value.filter(
                                    (value) => value !== allergy.value
                                  );
                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {allergy.label}
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

export default InformationsPetAllergiesForm;
