"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Plus, Clock, Euro, ImageIcon } from "lucide-react";
import { UploadButton } from "@/src/lib/uploadthing";
import Image from "next/image";
import { proServicesSchema } from "../../types/onboarding-schemas";
import { createServicesStepAction } from "@/src/actions";
import { toast } from "sonner";
import { useActionMutation } from "@/src/hooks/action-hooks";
import { DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/src/lib/utils";

const ServicesForm = ({ nextStep, previousStep }: { nextStep: () => void; previousStep: () => void }) => {
  const form = useForm<z.infer<typeof proServicesSchema>>({
    resolver: zodResolver(proServicesSchema),
    defaultValues: {
      services: [],
    },
  });

  const { control, handleSubmit, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const { mutateAsync } = useActionMutation(createServicesStepAction, {
    onSuccess: () => {
      reset();
      nextStep();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-end">
            {fields.length > 0 && (
              <Button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    description: "",
                    duration: 30,
                    price: 0,
                    image: "",
                  })
                }
                className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Nouveau Service
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={cn(
                  "group relative rounded-2xl border bg-card transition-all duration-300",
                  "hover:shadow-lg hover:scale-[1.02] hover:border-primary/50",
                  "dark:bg-gray-950/50 dark:backdrop-blur-xl"
                )}
              >
                <FormField
                  control={control}
                  name={`services.${index}.image`}
                  render={({ field: imageField }) => (
                    <div className="relative w-full h-48 rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                      {imageField.value ? (
                        <>
                          <Image
                            src={imageField.value}
                            alt="Aperçu du service"
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 p-2 bg-red-500/80 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => imageField.onChange("")}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <UploadButton
                            endpoint="documentsUploader"
                            onClientUploadComplete={(res) => {
                              if (res?.[0]) {
                                imageField.onChange(res[0].url);
                              }
                            }}
                            onUploadError={(error: Error) => {
                              console.error(error);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                />

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={control}
                      name={`services.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Nom du service"
                              className="text-lg font-medium bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg px-3 h-10 focus-visible:ring-1 focus-visible:ring-primary"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`services.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Description du service..."
                              className="min-h-[80px] resize-none bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg p-3 focus-visible:ring-1 focus-visible:ring-primary"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name={`services.${index}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2 p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                            <Clock className="h-4 w-4 text-gray-500 ml-1" />
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="30"
                                className="border-none bg-transparent p-0 h-auto focus-visible:ring-0"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value ? parseFloat(e.target.value) : null
                                  )
                                }
                              />
                            </FormControl>
                            <span className="text-sm text-gray-500 mr-1">min</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`services.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2 p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                            <Euro className="h-4 w-4 text-gray-500 ml-1" />
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                className="border-none bg-transparent p-0 h-auto focus-visible:ring-0"
                                {...field}
                                value={field.value ?? ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value ? parseFloat(e.target.value) : null
                                  )
                                }
                              />
                            </FormControl>
                            <span className="text-sm text-gray-500 mr-1">€</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            {fields.length === 0 && (
              <button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    description: "",
                    duration: 30,
                    price: 0,
                    image: "",
                  })
                }
                className={cn(
                  "flex flex-col items-center justify-center gap-4 p-8",
                  "rounded-2xl border-2 border-dashed",
                  "text-gray-500 hover:text-primary hover:border-primary",
                  "transition-colors duration-200"
                )}
              >
                <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-900">
                  <Plus className="h-6 w-6" />
                </div>
                <span>Ajouter votre premier service</span>
              </button>
            )}
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-4 w-full">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={previousStep}
            >
              Précédent
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-primary to-primary/80"
            >
              Suivant
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ServicesForm;
