'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Skeleton,
} from '@/components/ui';
import { ImageIcon, PenBox, Trash2, User } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { useUploadThing } from '@/src/lib/uploadthing';
import { cn } from '@/src/lib';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { clientSettingsSchema } from '../types/settings-schema';
import { UseMutateAsyncFunction } from '@tanstack/react-query';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};

interface ProfileFormProps {
  form: UseFormReturn<z.infer<typeof clientSettingsSchema>>;
  userInformations: any;
  mutateAsync: UseMutateAsyncFunction<
    { status: boolean },
    Error,
    z.infer<typeof clientSettingsSchema>
  >;
  onSubmit: () => Promise<void>;
  refetch: () => Promise<any>;
}

export function ProfileForm({
  form,
  userInformations,
  mutateAsync,
  onSubmit,
  refetch,
}: ProfileFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { control, setValue } = form;

  const handleDeleteImage = async () => {
    try {
      await mutateAsync({
        ...form.getValues(),
        image: '',
      });
      setValue('image', '');
      await onSubmit();
      await refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'image");
    }
  };

  const { startUpload } = useUploadThing('documentsUploader', {
    onClientUploadComplete: async (res) => {
      if (res && res[0]) {
        await mutateAsync({
          ...form.getValues(),
          image: res[0].url,
        });
        setValue('image', res[0].url);
        await onSubmit();
        await refetch();
      }
    },
    onUploadProgress: (p) => {
      setUploadProgress(p);
    },
    onUploadError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setIsUploading(true);
        toast.info("Téléchargement de l'image en cours...");
        await startUpload(acceptedFiles);
        setIsUploading(false);
      }
    },
  });

  return (
    <div className='space-y-6'>
      <div className='flex flex-col items-center gap-4'>
        {!userInformations?.image ? (
          <div className='w-32'>
            <div
              {...getRootProps()}
              className={cn(
                'w-full h-32 border-2 border-dashed border-primary/20 rounded-full transition-all bg-background/50 hover:bg-primary/5 flex items-center justify-center',
                isDragActive && 'border-primary bg-primary/5'
              )}
            >
              <input {...getInputProps()} />
              <div className='flex flex-col items-center gap-2'>
                <div className='p-2 rounded-lg bg-primary/10'>
                  <ImageIcon className='h-6 w-6 text-primary' />
                </div>
              </div>
            </div>
            {isUploading && (
              <div className='w-full mt-2'>
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
          <div className='group relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20'>
            {isUploading ? (
              <Skeleton className='w-full h-full rounded-full' />
            ) : (
              <Avatar className='w-full h-full'>
                <AvatarImage
                  src={userInformations.image}
                  className='object-cover'
                  onLoadingStatusChange={(status) => {
                    setIsImageLoading(status === 'loading');
                  }}
                />
                <AvatarFallback>
                  {isImageLoading ? (
                    <Skeleton className='w-full h-full rounded-full' />
                  ) : (
                    <User className='size-12' />
                  )}
                </AvatarFallback>
              </Avatar>
            )}
            <div className='absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity'>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-xl text-white hover:text-white hover:bg-white/20'
                >
                  <PenBox size={16} />
                </Button>
              </div>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-xl text-white hover:text-white hover:bg-white/20'
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage();
                }}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <FormField
          control={control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input {...field} placeholder='John Doe' value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='email'
                  placeholder='john@example.com'
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de téléphone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='tel'
                  placeholder='0612345678'
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='123 rue de la Paix'
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Paris' value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='zipCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code postal</FormLabel>
              <FormControl>
                <Input {...field} placeholder='75000' value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pays</FormLabel>
              <FormControl>
                <Input {...field} placeholder='France' value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
