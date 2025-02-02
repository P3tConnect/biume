'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Separator,
} from '@/components/ui';
import { Bell, Shield, User, ImageIcon, PenBox, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSession } from '@/src/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import {
  getUserInformations,
  updateUserInformations,
} from '@/src/actions/user.action';
import { toast } from 'sonner';
import { clientSettingsSchema } from './types/settings-schema';
import { useActionMutation, useActionQuery } from '@/src/hooks/action-hooks';
import { delay } from 'framer-motion';
import { useFormChangeToast } from '@/src/hooks/useFormChangeToast';
import { useDropzone } from 'react-dropzone';
import { useUploadThing } from '@/src/lib/uploadthing';
import { cn } from '@/src/lib';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};

const ClientSettingsForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { data: userInformations, refetch } = useActionQuery(
    getUserInformations,
    {}
  );

  const { startUpload } = useUploadThing('documentsUploader', {
    onClientUploadComplete: async (res) => {
      if (res && res[0]) {
        await mutateAsync({
          ...form.getValues(),
          image: res[0].url,
        });
        toast.success('Image téléchargée avec succès!');
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

  const form = useForm<z.infer<typeof clientSettingsSchema>>({
    resolver: zodResolver(clientSettingsSchema),
    values: {
      image: userInformations?.image ?? '',
      name: userInformations?.name ?? '',
      address: userInformations?.address ?? '',
      email: userInformations?.email ?? '',
      country: userInformations?.country ?? '',
      city: userInformations?.city ?? '',
      zipCode: userInformations?.zipCode ?? '',
      phoneNumber: userInformations?.phoneNumber ?? '',
      emailNotifications: userInformations?.emailNotifications ?? false,
      smsNotifications: userInformations?.smsNotifications ?? false,
      twoFactorEnabled: userInformations?.twoFactorEnabled ?? false,
    },
  });

  const { control, handleSubmit } = form;

  const { mutateAsync } = useActionMutation(updateUserInformations, {
    onSuccess: async () => {
      toast.success('Vos informations ont été mises à jour');
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  const {} = useFormChangeToast({
    form,
    onSubmit,
    message: 'Informations modifiées',
    description: 'Vos informations sont en attente de mise à jour',
    position: 'bottom-center',
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='mx-auto'>
        <Tabs defaultValue='profile' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='profile' className='flex items-center gap-2'>
              <User className='size-4' />
              Profil
            </TabsTrigger>
            <TabsTrigger
              value='notifications'
              className='flex items-center gap-2'
            >
              <Bell className='size-4' />
              Notifications
            </TabsTrigger>
            <TabsTrigger value='security' className='flex items-center gap-2'>
              <Shield className='size-4' />
              Sécurité
            </TabsTrigger>
          </TabsList>

          <TabsContent value='profile'>
            <Card>
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles et vos préférences.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
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
                      <Avatar className='w-full h-full'>
                        <AvatarImage
                          src={userInformations.image}
                          className='object-cover'
                        />
                        <AvatarFallback>
                          <User className='size-12' />
                        </AvatarFallback>
                      </Avatar>
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
                          onClick={() => {
                            mutateAsync({
                              ...form.getValues(),
                              image: '',
                            });
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
                          <Input
                            {...field}
                            placeholder='John Doe'
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='space-y-2'>
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
                  </div>

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
                          <Input
                            {...field}
                            placeholder='Paris'
                            value={field.value}
                          />
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
                          <Input
                            {...field}
                            placeholder='75000'
                            value={field.value}
                          />
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
                          <Input
                            {...field}
                            placeholder='France'
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='notifications'>
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notifications</CardTitle>
                <CardDescription>
                  Gérez vos préférences de notifications par email et SMS.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <FormField
                  control={control}
                  name='emailNotifications'
                  render={({ field }) => (
                    <FormItem className='flex items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel>Notifications par email</FormLabel>
                        <CardDescription>
                          Recevez des notifications par email pour les mises à
                          jour importantes.
                        </CardDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name='smsNotifications'
                  render={({ field }) => (
                    <FormItem className='flex items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel>Notifications par SMS</FormLabel>
                        <CardDescription>
                          Recevez des notifications par SMS pour les rappels
                          importants.
                        </CardDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='security'>
            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>
                  Gérez vos paramètres de sécurité et l'authentification à deux
                  facteurs.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <FormField
                  control={control}
                  name='twoFactorEnabled'
                  render={({ field }) => (
                    <FormItem className='flex items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel>Authentification à deux facteurs</FormLabel>
                        <CardDescription>
                          Ajoutez une couche de sécurité supplémentaire à votre
                          compte.
                        </CardDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

export default ClientSettingsForm;
