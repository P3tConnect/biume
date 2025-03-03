'use client';

import {
  Button,
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui';
import { useDropzone } from 'react-dropzone';
import { useUploadThing } from '@/src/lib/uploadthing';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/src/lib';
import { ImageIcon, PenBox, Trash2 } from 'lucide-react';
import { CreatePetSchema } from '@/src/db/pets';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPet } from '@/src/actions';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { usePetContext } from '../context/pet-context';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};

const InformationsPetForm = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { setPetId } = usePetContext();

  const form = useForm<z.infer<typeof CreatePetSchema>>({
    resolver: zodResolver(CreatePetSchema),
    defaultValues: {
      name: '',
      type: 'Dog',
      gender: 'Male',
      breed: '',
      image: '',
      birthDate: new Date(),
      description: '',
      weight: 0,
      height: 0,
    },
  });

  const { handleSubmit } = form;

  const { mutateAsync } = useMutation({
    mutationFn: createPet,
    onSuccess: (data) => {
      toast.success('Animal créé avec succès!');
      form.reset();

      console.log('Réponse de createPet:', data);

      let animalId = null;

      // Essayer d'extraire l'ID de la réponse selon sa structure
      if (data && Array.isArray(data) && data.length > 0 && data[0]?.id) {
        animalId = data[0].id;
      } else if (data && typeof data === 'object' && 'id' in data) {
        animalId = data.id;
      }

      if (animalId) {
        console.log('Setting petId à:', animalId);

        // Sauvegarder dans le contexte
        setPetId(animalId);

        // Sauvegarder dans localStorage pour plus de sécurité
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentPetId', animalId);
          console.log("ID de l'animal sauvegardé dans localStorage:", animalId);
        }
      } else {
        console.error('Impossible de définir petId, données invalides:', data);
      }

      nextStep();
    },
    onError: (error) => {
      console.error('Erreur création animal:', error);
      toast.error(`Erreur lors de la création de l'animal: ${error.message}`);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log('Soumission du formulaire animal avec:', data);
    await mutateAsync(data);
  });

  const { startUpload: startImageUpload } = useUploadThing(
    'documentsUploader',
    {
      onClientUploadComplete: (res) => {
        if (res && res[0]) {
          form.setValue('image', res[0].url);
          toast.success('Image téléchargé avec succès!');
        }
      },
      onUploadProgress(p) {
        setUploadProgress(p);
      },
      onUploadError: (error) => {
        toast.error(`Erreur: ${error.message}`);
      },
    }
  );

  const {
    getRootProps: getLogoRootProps,
    getInputProps: getLogoInputProps,
    isDragActive: isLogoDragActive,
  } = useDropzone({
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setIsUploading(true);
        toast.info("Téléchargement de l'image en cours...");
        await startImageUpload(acceptedFiles);
        setIsUploading(false);
      }
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-6'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-4 space-y-2'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex flex-col items-start gap-4'>
                      {form.getValues('image') == '' ? (
                        <div className='w-full'>
                          <div
                            {...getLogoRootProps()}
                            className={cn(
                              'w-full h-40 border-2 border-dashed border-primary/20 rounded-2xl transition-all bg-background/50 hover:bg-primary/5',
                              isLogoDragActive && 'border-primary bg-primary/5'
                            )}
                          >
                            <input {...getLogoInputProps()} />
                            <div className='flex flex-col items-center justify-center h-full gap-2'>
                              <div className='p-2 rounded-lg bg-primary/10'>
                                <ImageIcon className='h-6 w-6 text-primary' />
                              </div>
                              <div className='space-y-1 text-center'>
                                <p className='text-xs font-medium text-primary'>
                                  Glissez-déposez
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                  ou cliquez
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                  PNG, JPG • 5MB
                                </p>
                              </div>
                            </div>
                          </div>
                          {isUploading && (
                            <div className='w-full mt-2'>
                              <div className='h-1 w-full bg-primary/20 rounded-full overflow-hidden'>
                                <div
                                  className='h-full bg-primary transition-all duration-300'
                                  style={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className='w-full'>
                          <div className='group relative w-full h-52 rounded-2xl overflow-hidden border-2 border-primary/20'>
                            <Image
                              width={200}
                              height={200}
                              src={form.getValues('image') ?? ''}
                              alt='logo'
                              className='w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity'>
                              <div
                                {...getLogoRootProps()}
                                className='w-full h-full absolute inset-0 flex items-center justify-center gap-2'
                              >
                                <input {...getLogoInputProps()} />
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='rounded-xl text-white hover:text-white'
                                >
                                  <PenBox size={16} />
                                </Button>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='rounded-xl text-white hover:text-white'
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    form.setValue('image', '');
                                  }}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-8 space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: Luna' {...field} />
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
                    <FormControl>
                      <DatePicker
                        label='Date de naissance'
                        date={field.value ?? new Date()}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d&apos;animal</FormLabel>
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
                    <FormLabel>Sexe</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Sélectionnez le sexe' />
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
          </div>
        </div>

        {/* Caractéristiques physiques */}
        <div className='space-y-4'>
          <h3 className='text-lg font-medium'>Caractéristiques physiques</h3>
          <div className='grid grid-cols-3 gap-4'>
            <FormField
              control={form.control}
              name='weight'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poids (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      step='0.1'
                      placeholder='Ex: 25.5'
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
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
                    <Input
                      type='number'
                      placeholder='Ex: 60'
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='breed'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Race</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Ex: Golden Retriever'
                      {...field}
                      value={field.value ?? ''}
                    />
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
                    placeholder='Décrivez votre animal...'
                    className='resize-none h-20'
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-end pt-2'>
          <Button type='submit' onClick={() => console.log('Button clicked')}>
            Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InformationsPetForm;
