'use client';

import { clientSettingsSchema } from '@/app/(main)/dashboard/user/[userId]/settings/page';
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
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui';
import { Bell, Shield, User } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useSession } from '@/src/lib/auth-client';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateUser } from '@/src/actions/user.action';

const ClientSettingsForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof clientSettingsSchema>>;
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof clientSettingsSchema>) => {
    if (!session?.user) {
      toast.error('Session non trouvée');
      return;
    }

    try {
      setLoading(true);

      await updateUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified || false,
        createdAt: session.user.createdAt,
        updatedAt: new Date(),
        isPro: session.user.isPro || false,
        onBoardingComplete: session.user.onBoardingComplete || false,
        stripeId: session.user.stripeId,
        // lang: session.user.lang || 'fr',
        image: data.image || undefined,
        address: data.address || '',
        city: data.city || '',
        country: data.country || '',
        zipCode: data.zipCode || '',
        phoneNumber: data.phoneNumber || '',
        smsNotifications: data.smsNotifications || false,
        emailNotifications: data.emailNotifications || false,
        twoFactorEnabled: data.twoFactorEnabled || false,
      });

      toast.success('Profil mis à jour avec succès !');
    } catch (error) {
      console.error(error);
      toast.error('Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className='container mx-auto p-6'>
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
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='John Doe' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='space-y-2'>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={session?.user?.email || ''}
                      disabled
                      placeholder='john@example.com'
                    />
                  </div>

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

                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='123 rue de la Paix' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Paris' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='zipCode'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code postal</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='75000' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='country'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pays</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='France' />
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
                  control={form.control}
                  name='emailNotifications'
                  render={({ field }) => (
                    <div className='flex items-center justify-between'>
                      <div className='space-y-0.5'>
                        <FormLabel>Notifications par email</FormLabel>
                        <CardDescription>
                          Recevez des notifications par email pour les mises à
                          jour importantes.
                        </CardDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  )}
                />
                <Separator />
                <FormField
                  control={form.control}
                  name='smsNotifications'
                  render={({ field }) => (
                    <div className='flex items-center justify-between'>
                      <div className='space-y-0.5'>
                        <FormLabel>Notifications par SMS</FormLabel>
                        <CardDescription>
                          Recevez des notifications par SMS pour les rappels
                          importants.
                        </CardDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
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
                  control={form.control}
                  name='twoFactorEnabled'
                  render={({ field }) => (
                    <div className='flex items-center justify-between'>
                      <div className='space-y-0.5'>
                        <FormLabel>Authentification à deux facteurs</FormLabel>
                        <CardDescription>
                          Ajoutez une couche de sécurité supplémentaire à votre
                          compte.
                        </CardDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className='mt-8 flex justify-end'>
          <Button type='submit' disabled={loading} className='px-8'>
            {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientSettingsForm;
