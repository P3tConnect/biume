'use client';

import React from 'react';
import { useStepper, utils, petSchema } from '../hooks/useStepperAnimal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Button,
  Credenza,
  CredenzaContent,
  CredenzaTitle,
  CredenzaClose,
  CredenzaDescription,
  CredenzaHeader,
} from '@/components/ui';
import StepIndicator from '@/components/onboarding/components/step-indicator';

// Vous devrez créer ces composants
import InformationsPetForm from '../forms/informations-pet-form';
import PetCompleteStep from '../forms/pet-complete-step';
import InformationsPetDiseasesForm from '../forms/informations-pet-diseases-form';
import InformationsPetIntolerancesForm from '../forms/informations-pet-intolerances-form';
import InformationsPetAllergiesForm from '../forms/informations-pet-allergies-form';

const StepperAnimal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);

  const form = useForm<z.infer<typeof petSchema>>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      image: '',
      name: '',
      breed: '',
      birthDate: new Date(),
      gender: 'Male',
      type: 'Dog',
      weight: 0,
      height: 0,
      description: '',
      furColor: '',
      eyeColor: '',
      diseases: [],
      intolerances: [],
      allergies: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof petSchema>) => {
    if (stepper.current.id === 'pet') {
      const isValid = await form.trigger([
        'name',
        'breed',
        'birthDate',
        'gender',
        'type',
        'weight',
        'height',
        'furColor',
        'eyeColor',
      ]);

      if (!isValid) return;
      stepper.next();
      return;
    }
  };

  return (
    <Credenza open={open}>
      <CredenzaContent className='w-[900px]'>
        <CredenzaHeader className='flex flex-row items-center space-x-4'>
          <StepIndicator
            currentStep={currentIndex + 1}
            totalSteps={stepper.all.length}
            isLast={stepper.isLast}
            size={100}
            strokeWidth={10}
          />
          <div className='space-y-1 flex flex-col'>
            <CredenzaTitle>{stepper.current.title}</CredenzaTitle>
            <CredenzaDescription>
              {stepper.current.description}
            </CredenzaDescription>
          </div>
        </CredenzaHeader>

        {stepper.switch({
          pet: () => <InformationsPetForm form={form} />,
          'pet-diseases': () => <InformationsPetDiseasesForm form={form} />,
          'pet-intolerances': () => (
            <InformationsPetIntolerancesForm form={form} />
          ),
          'pet-allergies': () => <InformationsPetAllergiesForm form={form} />,
          complete: () => <PetCompleteStep />,
        })}

        <div className='space-y-4'>
          {!stepper.isLast ? (
            <div className='flex justify-end gap-4'>
              {stepper.isFirst ? (
                <CredenzaClose asChild>
                  <Button
                    variant='outline'
                    className='rounded-xl'
                    onClick={onClose}
                  >
                    Fermer
                  </Button>
                </CredenzaClose>
              ) : (
                <Button
                  variant='outline'
                  className='rounded-xl'
                  onClick={stepper.prev}
                >
                  Retour
                </Button>
              )}

              <Button
                onClick={async () => await onSubmit(form.getValues())}
                className='rounded-xl'
              >
                Suivant
              </Button>
            </div>
          ) : (
            <div className='flex flex-row justify-end gap-2'>
              <Button
                onClick={stepper.prev}
                variant='outline'
                className='rounded-xl'
              >
                Retour
              </Button>
              <CredenzaClose asChild>
                <Button
                  className='rounded-xl'
                  onClick={async () => await onSubmit(form.getValues())}
                >
                  Terminer
                </Button>
              </CredenzaClose>
            </div>
          )}
        </div>
      </CredenzaContent>
    </Credenza>
  );
};

export default StepperAnimal;
