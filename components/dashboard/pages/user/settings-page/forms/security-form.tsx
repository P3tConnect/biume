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

interface SecurityFormProps {
  form: UseFormReturn<z.infer<typeof clientSettingsSchema>>;
}

export function SecurityForm({ form }: SecurityFormProps) {
  const { control } = form;

  return (
    <div className='space-y-6'>
      <FormField
        control={control}
        name='twoFactorEnabled'
        render={({ field }) => (
          <FormItem className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <FormLabel>Authentification à deux facteurs</FormLabel>
              <CardDescription>
                Ajoutez une couche de sécurité supplémentaire à votre compte.
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
