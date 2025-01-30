'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X } from 'lucide-react';
import { proOptionsSchema } from '../../types/onboarding-schemas';
import { useStepper } from '../../hooks/useStepperClient';
import { createOptionsStepAction } from '@/src/actions';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { toast } from 'sonner';

export function OptionsForm() {
  const stepper = useStepper();
  const { form, resetFormAndAction, handleSubmitWithAction } = useHookFormAction(createOptionsStepAction, zodResolver(proOptionsSchema), {
    formProps: {
      defaultValues: {
        options: [],
      }
    },
    actionProps: {
      onSuccess: () => {
        resetFormAndAction();
        stepper.next();
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
      onExecute: () => {
        toast.loading("Création des options...");
      }
    },
  })

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-8">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Option #{index + 1}</h3>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`options.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l&apos;option</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Toilettage supplémentaire" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`options.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (€)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        value={field.value ?? ''}
                        onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`options.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre option..."
                        className="resize-none"
                        {...field}
                        value={field.value ?? ''}
                        onChange={e => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => append({
              title: '',
              description: '',
              price: 0,
              organizationId: ""
            })}
          >
            Ajouter une option
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default OptionsForm;