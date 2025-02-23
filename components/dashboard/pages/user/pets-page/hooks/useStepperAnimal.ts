import { defineStepper } from '@stepperize/react';
import { z } from 'zod';

export const petSchema = z.object({
  name: z.string().min(1, "Le nom de l'animal est requis"),
  image: z.string().optional(),
  breed: z.string().min(1, "La race de l'animal est requise"),
  birthDate: z.date(),
  gender: z.enum(['Male', 'Female']),
  type: z.enum(['Dog', 'Cat', 'Bird', 'Horse', 'NAC']),
  weight: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  description: z.string().optional(),
  furColor: z.string().min(1, 'La couleur du pelage est requise'),
  eyeColor: z.string().min(1, 'La couleur des yeux est requise'),
  diseases: z.array(z.string()).optional(),
  intolerances: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
});

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
