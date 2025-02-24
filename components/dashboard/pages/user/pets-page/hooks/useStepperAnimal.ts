import { defineStepper } from '@stepperize/react';
import { z } from 'zod';

export const { steps, useStepper, utils } = defineStepper(
  {
    id: 'pet',
    title: 'Votre animal',
    description: 'Informations générales sur votre animal',
    schema: petSchema,
  },
  {
    id: 'pet-diseases',
    title: 'Maladies',
    description: 'Renseignez les maladies de votre animal',
    schema: petSchema,
  },
  {
    id: 'pet-intolerances',
    title: 'Intolérances',
    description: 'Renseignez les intolérances de votre animal',
    schema: petSchema,
  },
  {
    id: 'pet-allergies',
    title: 'Allergies',
    description: 'Renseignez les allergies de votre animal',
    schema: petSchema,
  },
  {
    id: 'complete',
    title: 'Terminé',
    description: 'Vous avez terminé la création de votre animal !',
    schema: z.object({}),
  }
);
