'use client';

import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Button,
} from '@/components/ui';
import { petSchema } from '../schema/pet-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updatePetDeseases } from '@/src/actions';
import { useActionMutation } from '@/src/hooks/action-hooks';
import { toast } from 'sonner';
import { usePetContext } from '../context/pet-context';
import { z } from 'zod';
import { useSession } from '@/src/lib/auth-client';
import { Tag, TagInput } from 'emblor';

// Liste des maladies communes chez les animaux comme exemple
const commonDeseases = [
  { id: '1', text: 'Diabète' },
  { id: '2', text: 'Arthrite' },
  { id: '3', text: 'Maladie cardiaque' },
  { id: '4', text: 'Allergies' },
  { id: '5', text: 'Problèmes dentaires' },
];

const InformationsPetDeseasesForm = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const { petId } = usePetContext();
  const { data: session } = useSession();
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const form = useForm<z.infer<typeof petSchema>>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      deseases: [],
    },
  });

  const { mutateAsync } = useActionMutation(updatePetDeseases, {
    onSuccess: () => {
      toast.success('Maladies enregistrées avec succès!');
      nextStep();
    },
    onError: (error) => {
      toast.error(
        `Erreur lors de l'enregistrement des maladies: ${error.message}`
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
      deseases: data.deseases ?? [],
      petId: petId,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-6'>
        <FormField
          control={form.control}
          name='deseases'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Sélectionnez les maladies</FormLabel>
              <FormControl>
                <TagInput
                  tags={
                    field.value?.map((desease, index) => ({
                      id: index.toString(),
                      text: desease,
                    })) || []
                  }
                  setTags={(newTagsOrSetter) => {
                    const tagsArray = Array.isArray(newTagsOrSetter)
                      ? newTagsOrSetter
                      : [];
                    field.onChange(tagsArray.map((tag: Tag) => tag.text));
                  }}
                  placeholder='Ajouter une maladie'
                  styleClasses={{
                    tagList: {
                      container: 'gap-1',
                    },
                    input:
                      'rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    tag: {
                      body: 'relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7',
                      closeButton:
                        'absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground',
                    },
                  }}
                  activeTagIndex={activeTagIndex}
                  setActiveTagIndex={setActiveTagIndex}
                  inlineTags={false}
                  inputFieldPosition='top'
                />
              </FormControl>
              <div className='flex flex-wrap gap-1 mt-2'>
                {commonDeseases.map((desease) => (
                  <Button
                    key={desease.id}
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      const currentDeseases = field.value || [];
                      if (!currentDeseases.includes(desease.text)) {
                        field.onChange([...currentDeseases, desease.text]);
                      }
                    }}
                    className='text-xs'
                  >
                    {desease.text}
                  </Button>
                ))}
              </div>
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

export default InformationsPetDeseasesForm;
