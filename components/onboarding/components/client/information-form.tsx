'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from '@/components/ui';
import { ImageIcon, PenBox, Trash2 } from 'lucide-react';

import { useDropzone } from 'react-dropzone';
import { useUploadThing } from '@/src/lib/uploadthing';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { clientOnBoardingSchema } from '../stepper-client';
import { toast } from 'sonner';
import Image from 'next/image';
import { cn } from '@/src/lib';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};

const ClientInformationForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof clientOnBoardingSchema>>;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const {
    getRootProps: getCoverRootProps,
    getInputProps: getCoverInputProps,
    isDragActive: isCoverDragActive,
  } = useDropzone({
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setIsUploading(true);
        toast.info("Téléchargement de l'image de couverture en cours...");
        await startImageUpload(acceptedFiles);
        setIsUploading(false);
      }
    },
  });

  return (
    <Form {...form}>
      <form className='space-y-6 w-full'>
        <div className='flex flex-col items-start gap-4'>
          <p className='text-sm font-semibold'>Photo de profil</p>
          {form.getValues('image') == '' ? (
            <div className='w-full'>
              <div
                {...getLogoRootProps()}
                className={cn(
                  'w-full h-full border-2 border-dashed border-primary/20 rounded-2xl transition-all bg-background/50 hover:bg-primary/5',
                  isLogoDragActive && 'border-primary bg-primary/5'
                )}
              >
                <input {...getLogoInputProps()} />
                <div className='flex flex-col items-center gap-2 p-6'>
                  <div className='p-2 rounded-lg bg-primary/10'>
                    <ImageIcon className='h-6 w-6 text-primary' />
                  </div>
                  <div className='space-y-1 text-center'>
                    <p className='text-xs font-medium text-primary'>
                      Glissez-déposez
                    </p>
                    <p className='text-xs text-muted-foreground'>ou cliquez</p>
                    <p className='text-xs text-muted-foreground'>
                      PNG, JPG • 5MB
                    </p>
                  </div>
                </div>
              </div>
              {isUploading && (
                <div className='w-32 mt-2'>
                  <div className='h-1 w-full bg-primary/20 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-primary transition-all duration-300 rounded-full'
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className='flex flex-col items-center gap-4'>
              <div className='group relative w-32 h-30 rounded-2xl overflow-hidden border-2 border-primary/20'>
                <img
                  src={form.getValues('image') ?? ''}
                  alt='logo'
                  className='object-cover'
                />
                <div className='absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <div
                    {...getLogoRootProps()}
                    className='w-full h-full absolute inset-0'
                  >
                    <input {...getLogoInputProps()} />
                    <Button
                      variant='ghost'
                      size='icon'
                      className='rounded-xl text-white hover:text-white'
                    >
                      <PenBox size={16} />
                    </Button>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-xl text-white hover:text-white'
                    onClick={() => form.setValue('image', '')}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-row gap-6'>
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-semibold'>Pays</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Pays'
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-semibold'>Ville</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Ville'
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-row gap-6'>
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-semibold'>Adresse</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Numéro et nom de la rue'
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='zipCode'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-semibold'>
                  Code Postal
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Code postal'
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-row gap-6'>
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-semibold'>
                  Numéro de téléphone
                </FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    placeholder='Numéro de téléphone'
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default ClientInformationForm;
