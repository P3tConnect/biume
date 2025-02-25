'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
} from '@/components/ui';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { petSchema } from '../schema/pet-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createPetDeseases } from '@/src/actions';
import { useActionMutation } from '@/src/hooks/action-hooks';
import { toast } from 'sonner';
import { usePetContext } from '../context/pet-context';
import { cn } from '@/src/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { z } from 'zod';
import { useSession } from '@/src/lib/auth-client';

const InformationsPetDeseasesForm = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const { petId } = usePetContext();
  const { data: session } = useSession();

  const diseasesOptions = [
    { label: 'Diabète', value: 'diabetes' },
    { label: 'Arthrite', value: 'arthritis' },
    { label: 'Problèmes cardiaques', value: 'heart_problems' },
    { label: 'Problèmes respiratoires', value: 'respiratory_problems' },
    { label: 'Problèmes digestifs', value: 'digestive_problems' },
    { label: 'Problèmes musculaires', value: 'muscular_problems' },
    { label: 'Problèmes dermatologiques', value: 'dermatological_problems' },
    { label: 'Problèmes endocriniennes', value: 'endocrine_problems' },
    { label: 'Problèmes immunologiques', value: 'immunological_problems' },
    { label: 'Autre', value: 'other' },
  ];

  const form = useForm<z.infer<typeof petSchema>>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      deseases: [],
      pets: petId,
    },
  });

  const { mutateAsync } = useActionMutation(createPetDeseases, {
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

    await mutateAsync({
      pets: petId,
      deseases: data.deseases ?? [],
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Sélectionnez les maladies</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-full justify-between',
                        !field.value?.length && 'text-muted-foreground'
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} maladie${field.value.length > 1 ? 's' : ''} sélectionnée${field.value.length > 1 ? 's' : ''}`
                        : 'Sélectionner des maladies'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[400px] p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Rechercher une maladie...' />
                    <CommandEmpty>Aucune maladie trouvée.</CommandEmpty>
                    <CommandGroup className='max-h-[200px] overflow-auto'>
                      {diseasesOptions.map((name) => (
                        <CommandItem
                          key={name.value}
                          onSelect={() => {
                            const currentValue = field.value || [];
                            const newValue = currentValue.includes(name.value)
                              ? currentValue.filter(
                                  (value) => value !== name.value
                                )
                              : [...currentValue, name.value];
                            field.onChange(newValue);
                          }}
                        >
                          <div
                            className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                              field.value?.includes(name.value)
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50 [&_svg]:invisible'
                            )}
                          >
                            <span className='h-4 w-4 text-xs'>✓</span>
                          </div>
                          {name.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className='flex flex-wrap gap-2 mt-2'>
                {field.value?.map((value) => {
                  const disease = diseasesOptions.find(
                    (d) => d.value === value
                  );
                  return disease ? (
                    <Badge
                      key={disease.value}
                      variant='secondary'
                      className='flex items-center gap-1'
                    >
                      {disease.label}
                      <button
                        type='button'
                        className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                        onClick={() => {
                          const newValue =
                            field.value?.filter((v) => v !== value) || [];
                          field.onChange(newValue);
                        }}
                      >
                        <X className='h-3 w-3' />
                        <span className='sr-only'>
                          Supprimer {disease.label}
                        </span>
                      </button>
                    </Badge>
                  ) : null;
                })}
              </div>
              <FormMessage />
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
