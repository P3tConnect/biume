'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Switch,
  CardDescription,
} from '@/components/ui';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { clientSettingsSchema } from '../types/settings-schema';

interface NotificationsFormProps {
  form: UseFormReturn<z.infer<typeof clientSettingsSchema>>;
}

export function NotificationsForm({ form }: NotificationsFormProps) {
  const { control } = form;

  return (
    <div className='space-y-6'>
      <FormField
        control={control}
        name='emailNotifications'
        render={({ field }) => (
          <FormItem className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <FormLabel>Notifications par email</FormLabel>
              <CardDescription>
                Recevez des notifications par email pour les mises à jour
                importantes.
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
                Recevez des notifications par SMS pour les rappels importants.
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
    </div>
  );
}
