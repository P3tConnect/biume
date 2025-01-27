'use client';

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X } from 'lucide-react'
import { UploadButton } from '@/src/lib/uploadthing'
import Image from 'next/image'
import { proServicesSchema } from '../../types/onboarding-schemas';
import { useServerActionMutation } from '@/src/hooks';
import { createServicesStepAction } from '@/src/actions';
import { useStepper } from '../../hooks/useStepper';
import { toast } from 'sonner';

const ServicesForm = () => {
  const stepper = useStepper();
  const form = useForm<z.infer<typeof proServicesSchema>>({
    resolver: zodResolver(proServicesSchema),
    defaultValues: {
      services: [],
    },
  });

  const { control, handleSubmit, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services',
  })

  const { mutateAsync } = useServerActionMutation(createServicesStepAction, {
    onSuccess: () => {
      reset();
      stepper.next();
    },
    onMutate: () => {
      toast.loading("Création des services...");
    },
    onError: () => {
      toast.error("Erreur lors de la création des services");
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Service #{index + 1}</h3>
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
                control={form.control}
                name={`services.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du service</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex: Promenade de chien"
                        type='text'
                        {...field}
                        value={field.value ?? ''}
                        onChange={e => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`services.${index}.price`}
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
                control={form.control}
                name={`services.${index}.duration`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durée (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="30"
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
                control={form.control}
                name={`services.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre service..."
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

            <FormField
              control={form.control}
              name={`services.${index}.image`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-center space-y-4">
                      {field.value ? (
                        <div className="relative w-40 h-40">
                          <Image
                            src={field.value}
                            alt="Aperçu du service"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <button
                            className="absolute top-0 right-0 m-2 p-2 bg-red-500 text-white rounded-full"
                            onClick={() => field.onChange('')}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <UploadButton
                          endpoint="documentsUploader"
                          onClientUploadComplete={(res) => {
                            if (res?.[0]) {
                              field.onChange(res[0].url)
                            }
                          }}
                          onUploadError={(error: Error) => {
                            console.error(error);
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => append({
              name: '',
              description: '',
              duration: 30,
              price: 0,
              image: ''
            })}
          >
            Ajouter un service
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ServicesForm