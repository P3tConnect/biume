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
import { Bell, Shield, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSession } from '@/src/lib/auth-client';
import { updateUser } from '@/src/actions/user.action';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useServerActionMutation } from '@/src/hooks';
import { toast } from 'sonner';

export const clientSettingsSchema = z.object({
  image: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  address: z
    .string()
    .min(
      1,
      'Votre adresse doit contenie le numéro de votre rue ainsi que le nom de la rue'
    ),
  country: z.string().min(1, 'Le pays doit être valide'),
  city: z.string().min(1, 'Votre ville doit être valide'),
  zipCode: z
    .string()
    .min(5, 'Votre code postal doit être valide, soit 5 chiffres'),
  phoneNumber: z
    .string()
    .min(10, 'Votre numéro doit comprendre que 10 chiffres'),
  emailNotifications: z.boolean().default(false).optional(),
  smsNotifications: z.boolean().default(false).optional(),
  twoFactorEnabled: z.boolean().default(false).optional(),
});

const ClientSettingsForm = () => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof clientSettingsSchema>>({
    resolver: zodResolver(clientSettingsSchema),
    defaultValues: {
      image: session?.user?.image ?? '',
      name: session?.user?.name ?? '',
      address: session?.user?.address ?? '',
      email: '',
      country: session?.user?.country ?? '',
      city: session?.user?.city ?? '',
      zipCode: session?.user?.zipCode ?? '',
      phoneNumber: session?.user?.phoneNumber ?? '',
      emailNotifications: session?.user?.emailNotifications ?? false,
      smsNotifications: session?.user?.smsNotifications ?? false,
      twoFactorEnabled: session?.user?.twoFactorEnabled ?? false,
    },
  });

  const { control, handleSubmit } = form;

  const { mutateAsync } = useServerActionMutation(updateUser, {
    onSuccess: () => {
      toast.success('Vos informations ont été mises à jour');
    },
    onMutate: () => {
      toast.loading('Mise à jour des informations...');
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await mutateAsync(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='container mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-8'>Paramètres</h1>
        <Tabs defaultValue='profile' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 mb-8'>
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
                  <Avatar className='size-24'>
                    {session?.user?.image ? (
                      <AvatarImage src={session.user.image} />
                    ) : (
                      <AvatarFallback>
                        <User className='size-12' />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>

                <Separator />

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
                            value={field.value ?? ''}
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
                            value={field.value ?? ''}
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
                            value={field.value ?? ''}
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
                            value={field.value ?? ''}
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
                            value={field.value ?? ''}
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

        <div className='mt-8 flex justify-end'>
          <Button type='submit' className='px-8'>
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientSettingsForm;
