'use client';

import React, { useState, useEffect } from 'react';
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
import { z } from 'zod';
import { Tag, TagInput } from 'emblor';
import { toast } from 'sonner';
import { usePetContext } from '../context/pet-context';
import { useSession } from '@/src/lib/auth-client';
import { updatePetDeseases } from '@/src/actions';
import { useMutation } from '@tanstack/react-query';

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
  isPending,
}: {
  nextStep: () => void;
  previousStep: () => void;
  isPending: boolean;
}) => {
  const { petId } = usePetContext();
  const { data: session } = useSession();
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [selectedDeseases, setSelectedDeseases] = useState<string[]>([]);

  const form = useForm<z.infer<typeof petSchema>>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      deseases: [],
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: updatePetDeseases,
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

  useEffect(() => {
    form.setValue('deseases', selectedDeseases);
  }, [selectedDeseases, form]);

  const handleDiseaseSelection = (diseaseText: string) => {
    setSelectedDeseases((current) => {
      if (current.includes(diseaseText)) {
        return current;
      }
      return [...current, diseaseText];
    });
  };

  const handleSubmit = async () => {
    if (!petId) {
      toast.error("Erreur : ID de l'animal non trouvé");
      return;
    }

    if (!session) {
      toast.error('Erreur : Session non trouvée');
      return;
    }

    await mutateAsync({
      deseases: selectedDeseases,
      petId: petId,
    });
  };

  return (
    <Form {...form}>
      <div className='space-y-6'>
        <FormField
          control={form.control}
          name='deseases'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Sélectionnez les maladies</FormLabel>
              <FormControl>
                <TagInput
                  tags={
                    selectedDeseases.map((desease, index) => ({
                      id: index.toString(),
                      text: desease,
                    })) || []
                  }
                  setTags={(newTagsOrSetter) => {
                    const tagsArray = Array.isArray(newTagsOrSetter)
                      ? newTagsOrSetter
                      : newTagsOrSetter([]);

                    const newDeseases = tagsArray.map((tag: Tag) => tag.text);
                    setSelectedDeseases(newDeseases);
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
                    onClick={() => handleDiseaseSelection(desease.text)}
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
          <Button variant='outline' onClick={previousStep} type='button'>
            Retour
          </Button>
          <Button type='button' onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Enregistrement...' : 'Suivant'}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default InformationsPetDeseasesForm;
