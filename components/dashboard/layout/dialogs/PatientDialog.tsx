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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  CalendarIcon,
  Loader2,
  PawPrint,
  UserRound,
  ClipboardList,
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/src/lib/utils';
import { getClients } from '@/src/actions/client.action';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from '@/components/ui';

interface PatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères.',
  }),
  type: z.enum(['Dog', 'Cat', 'Bird', 'Horse', 'NAC'], {
    message: "Veuillez sélectionner un type d'animal valide.",
  }),
  gender: z.enum(['Male', 'Female'], {
    message: 'Veuillez sélectionner un genre.',
  }),
  weight: z
    .string()
    .optional()
    .transform((v) => (v === '' ? undefined : Number(v))),
  height: z
    .string()
    .optional()
    .transform((v) => (v === '' ? undefined : Number(v))),
  breed: z.string().optional(),
  nacType: z.string().optional(),
  birthDate: z.date({
    required_error: 'La date de naissance est requise.',
  }),
  description: z.string().optional(),
  ownerId: z.string({
    required_error: 'Le propriétaire est requis.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Cette fonction simule l'appel à createPet de src/actions/pet.action.ts
const createPet = async (data: FormValues) => {
  // Simulation d'un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Patient créé:', data);
      resolve({ success: true, data });
    }, 1000);
  });
};

const PatientDialog = ({ open, onOpenChange }: PatientDialogProps) => {
  const router = useRouter();

  // Récupération des clients
  const { data: clients, isLoading: isLoadingClients } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const result = await getClients({ status: 'Active' });
      if ('error' in result) {
        throw new Error(result.error);
      }
      return result.data || [];
    },
    // On ne charge les clients que si le modal est ouvert
    enabled: open,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'Dog',
      gender: 'Male',
      breed: '',
      nacType: '',
      description: '',
    },
  });

  const selectedType = form.watch('type');
  const selectedGender = form.watch('gender');
  const selectedAnimalName = form.watch('name');

  const mutation = useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      toast.success('Le patient a été créé avec succès');
      form.reset();
      onOpenChange(false);
      router.refresh();
    },
    onError: () => {
      toast.error('Une erreur est survenue lors de la création du patient');
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  // Fonction pour obtenir l'emoji du type d'animal
  const getAnimalEmoji = (type: string) => {
    switch (type) {
      case 'Dog':
        return '🐕';
      case 'Cat':
        return '🐈';
      case 'Bird':
        return '🦜';
      case 'Horse':
        return '🐎';
      case 'NAC':
        return '🦔';
      default:
        return '🐾';
    }
  };

  // Fonction pour obtenir le label du type d'animal en français
  const getAnimalTypeLabel = (type: string) => {
    switch (type) {
      case 'Dog':
        return 'Chien';
      case 'Cat':
        return 'Chat';
      case 'Bird':
        return 'Oiseau';
      case 'Horse':
        return 'Cheval';
      case 'NAC':
        return 'NAC';
      default:
        return type;
    }
  };

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className='sm:max-w-2xl max-h-[90vh] overflow-y-auto'>
        <CredenzaHeader>
          <CredenzaTitle className='text-xl font-bold'>
            Créer un nouveau patient
          </CredenzaTitle>
        </CredenzaHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col md:flex-row gap-6'>
              {/* Prévisualisation du patient */}
              <Card className='md:w-1/3 p-4 flex flex-col items-center space-y-3 border-dashed'>
                <Avatar className='h-20 w-20 bg-primary/10'>
                  <AvatarFallback className='text-2xl'>
                    {selectedAnimalName
                      ? selectedAnimalName.charAt(0).toUpperCase()
                      : getAnimalEmoji(selectedType)}
                  </AvatarFallback>
                </Avatar>
                <div className='text-center space-y-1'>
                  <h3 className='font-medium text-lg'>
                    {selectedAnimalName || "Nom de l'animal"}
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    {getAnimalTypeLabel(selectedType)} •{' '}
                    {selectedGender === 'Male' ? 'Mâle' : 'Femelle'}
                  </p>
                </div>
              </Card>

              {/* Formulaire à onglets */}
              <div className='md:w-2/3'>
                <Tabs defaultValue='info' className='w-full'>
                  <TabsList className='grid grid-cols-3 mb-4'>
                    <TabsTrigger
                      value='owner'
                      className='flex items-center gap-2'
                    >
                      <UserRound className='h-4 w-4' />
                      <span className='hidden sm:inline'>Propriétaire</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value='info'
                      className='flex items-center gap-2'
                    >
                      <PawPrint className='h-4 w-4' />
                      <span className='hidden sm:inline'>Informations</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value='details'
                      className='flex items-center gap-2'
                    >
                      <ClipboardList className='h-4 w-4' />
                      <span className='hidden sm:inline'>Détails</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Onglet propriétaire */}
                  <TabsContent value='owner' className='space-y-4'>
                    <FormField
                      control={form.control}
                      name='ownerId'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Propriétaire</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isLoadingClients}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    isLoadingClients
                                      ? 'Chargement des clients...'
                                      : 'Sélectionnez un propriétaire'
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isLoadingClients ? (
                                <div className='flex items-center justify-center p-2'>
                                  <Loader2 className='h-4 w-4 animate-spin mr-2' />
                                  <span>Chargement...</span>
                                </div>
                              ) : clients && clients.length > 0 ? (
                                clients.map((client) => (
                                  <SelectItem key={client.id} value={client.id}>
                                    {client.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <div className='p-2 text-center text-sm'>
                                  Aucun client disponible
                                </div>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* Onglet informations principales */}
                  <TabsContent value='info' className='space-y-4'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder='Rex' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='grid grid-cols-2 gap-4'>
                      <FormField
                        control={form.control}
                        name='type'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type d'animal</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Sélectionnez un type' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='Dog'>Chien</SelectItem>
                                <SelectItem value='Cat'>Chat</SelectItem>
                                <SelectItem value='Bird'>Oiseau</SelectItem>
                                <SelectItem value='Horse'>Cheval</SelectItem>
                                <SelectItem value='NAC'>NAC</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='gender'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Sélectionnez un genre' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value='Male'>Mâle</SelectItem>
                                <SelectItem value='Female'>Femelle</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {selectedType === 'NAC' && (
                      <FormField
                        control={form.control}
                        name='nacType'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type de NAC</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Lapin, Hamster, etc.'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name='breed'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Race</FormLabel>
                          <FormControl>
                            <Input placeholder="Race de l'animal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='birthDate'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Date de naissance</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP', { locale: fr })
                                  ) : (
                                    <span>Sélectionnez une date</span>
                                  )}
                                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className='w-auto p-0'
                              align='start'
                            >
                              <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date('1900-01-01')
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* Onglet détails */}
                  <TabsContent value='details' className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <FormField
                        control={form.control}
                        name='weight'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poids (kg)</FormLabel>
                            <FormControl>
                              <Input type='number' placeholder='0' {...field} />
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
                              <Input type='number' placeholder='0' {...field} />
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
                            <Textarea
                              placeholder="Informations complémentaires sur l'animal"
                              className='resize-none min-h-32'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className='flex justify-end gap-3 pt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button
                type='submit'
                disabled={mutation.isPending}
                className='min-w-28'
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Création...
                  </>
                ) : (
                  'Créer le patient'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
};

export default PatientDialog;
