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
import { updatePetAllergies } from '@/src/actions';
import { useMutation } from '@tanstack/react-query';

// Liste des allergies communes chez les animaux comme exemple
const commonAllergies = [
  { id: '1', text: 'Pollen' },
  { id: '2', text: 'Acariens' },
  { id: '3', text: 'Protéines de viande' },
  { id: '4', text: 'Céréales' },
  { id: '5', text: 'Produits laitiers' },
];

const InformationsPetAllergiesForm = ({
  nextStep,
  previousStep,
  onSubmitAllergies,
  isPending,
}: {
  nextStep: () => void;
  previousStep: () => void;
  onSubmitAllergies: (allergies: string[]) => Promise<void>;
  isPending: boolean;
}) => {
  const { petId } = usePetContext();
  const { data: session } = useSession();
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

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

  // Mettre à jour le formulaire lorsque selectedAllergies change
  useEffect(() => {
    form.setValue('allergies', selectedAllergies);
  }, [selectedAllergies, form]);

  const handleAllergySelection = (allergyText: string) => {
    setSelectedAllergies((current) => {
      if (current.includes(allergyText)) {
        return current;
      }
      return [...current, allergyText];
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
      allergies: selectedAllergies,
      petId: petId,
    });
  };

  return (
    <Form {...form}>
      <div className='space-y-6'>
        <FormField
          control={form.control}
          name='allergies'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Sélectionnez les allergies</FormLabel>
              <FormControl>
                <TagInput
                  tags={
                    selectedAllergies.map((allergy, index) => ({
                      id: index.toString(),
                      text: allergy,
                    })) || []
                  }
                  setTags={(newTagsOrSetter) => {
                    const tagsArray = Array.isArray(newTagsOrSetter)
                      ? newTagsOrSetter
                      : newTagsOrSetter([]);

                    const newAllergies = tagsArray.map((tag: Tag) => tag.text);
                    setSelectedAllergies(newAllergies);
                  }}
                  placeholder='Ajouter une allergie'
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
                {commonAllergies.map((allergy) => (
                  <Button
                    key={allergy.id}
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => handleAllergySelection(allergy.text)}
                    className='text-xs'
                  >
                    {allergy.text}
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

export default InformationsPetAllergiesForm;
