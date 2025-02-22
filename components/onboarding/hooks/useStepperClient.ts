import { defineStepper } from '@stepperize/react';
import { z } from 'zod';

export const { steps, useStepper, utils } = defineStepper(
  {
    id: 'start',
    title: 'Bienvenue',
    description: "Bienvenue dans l'inscription de votre personnel !",
    schema: z.object({}),
  },
  {
    id: 'informations',
    title: 'Informations',
    description:
      'Renseignez les informations personnelles liées a votre compte.',
    schema: z.object({
      image: z.string().optional(),
      address: z.string(),
      city: z.string(),
      country: z.string(),
      zipCode: z.string(),
      phoneNumber: z.string(),
    }),
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description:
      'Ici vous pouvez choisir les services que vous offrez à vos clients.',
    schema: z.object({
      smsNotification: z.boolean().optional(),
      emailNotification: z.boolean().optional(),
    }),
  },
  {
    id: 'pet',
    title: 'Votre animal',
    description: 'Ajoutez votre premier animal de compagnie (optionnel)',
    schema: z.object({
      name: z.string(),
      image: z.string(),
      breed: z.string(),
      birthDate: z.string(),
      gender: z.string(),
      type: z.string(),
      weight: z.number(),
      height: z.number(),
      description: z.string().optional(),
      furColor: z.string(),
      eyeColor: z.string(),
    }),
  },
  {
    id: 'complete',
    title: 'Complete',
    description:
      "Vous avez terminé l'inscription, vous pouvez maintenant commencer à utiliser votre compte personnel !",
    schema: z.object({}),
  }
);
