'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { DatePicker } from '@/components/ui/date-picker';

const petFormSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  type: z.string().min(1, 'Le type est requis'),
  weight: z.string().min(1, 'Le poids est requis'),
  height: z.string().min(1, 'La taille est requise'),
  description: z.string().optional(),
  birthDate: z.date(),
  furColor: z.string().min(1, 'La couleur du pelage est requise'),
  eyeColor: z.string().min(1, 'La couleur des yeux est requise'),
});

type PetFormValues = z.infer<typeof petFormSchema>;

interface EditPetDialogProps {
  pet: {
    id: string;
    name: string;
    type: 'Dog' | 'Cat' | 'Bird' | 'Horse' | 'NAC';
    weight: number | null;
    height: number | null;
    description: string | null;
    birthDate: Date;
    furColor: string | null;
    eyeColor: string | null;
  };
}

const FormEditPet = ({ pet }: EditPetDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: pet.name,
      type: pet.type,
      weight: pet.weight?.toString() ?? '',
      height: pet.height?.toString() ?? '',
      description: pet.description ?? '',
      birthDate: pet.birthDate,
      furColor: pet.furColor ?? '',
      eyeColor: pet.eyeColor ?? '',
    },
  });

  async function onSubmit(data: PetFormValues) {
    console.log(data);
    setOpen(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='weight'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poids (kg)</FormLabel>
                <FormControl>
                  <Input {...field} type='number' step='0.1' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='height'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taille (cm)</FormLabel>
                <FormControl>
                  <Input {...field} type='number' step='0.1' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='furColor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Couleur du pelage</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='eyeColor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Couleur des yeux</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='birthDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de naissance</FormLabel>
                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end space-x-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
          >
            Annuler
          </Button>
          <Button type='submit' disabled={status === 'executing'}>
            {status === 'executing' ? 'Modification...' : 'Modifier'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormEditPet;
