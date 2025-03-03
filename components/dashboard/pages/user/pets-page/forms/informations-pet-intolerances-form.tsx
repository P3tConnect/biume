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
import { petSchema } from '../schema/pet-schema';
import { updatePetIntolerences } from '@/src/actions';
import { useActionMutation } from '@/src/hooks/action-hooks';
import { toast } from 'sonner';
import { usePetContext } from '../context/pet-context';
import { z } from 'zod';
import { useSession } from '@/src/lib/auth-client';

const InformationsPetIntolerancesForm = ({
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
      intolerences: [],
    },
  });

  const { mutateAsync } = useActionMutation(updatePetIntolerences, {
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

    if (!session) {
      toast.error('Erreur : Session non trouvée');
      return;
    }

    await mutateAsync({
      intolerences: data.intolerences ?? [],
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

export default InformationsPetIntolerancesForm;
