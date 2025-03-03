'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { petSchema } from '../schema/pet-schema';
import { Form, Button } from '@/components/ui';
import { toast } from 'sonner';
import { usePetContext } from '../context/pet-context';
import { z } from 'zod';
import { useSession } from '@/src/lib/auth-client';
import { updatePetAllergies } from '@/src/actions';
import { useMutation } from '@tanstack/react-query';

const InformationsPetAllergiesForm = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const { petId } = usePetContext();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof petSchema>>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      allergies: [],
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: updatePetAllergies,
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

    if (!session) {
      toast.error('Erreur : Session non trouvée');
      return;
    }

    await mutateAsync({
      allergies: data.allergies ?? [],
      petId: petId,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-6'>
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
