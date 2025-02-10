"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Plus, Clock, Euro } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { cn } from "@/src/lib/utils";
import {
  DropzoneInput,
  DEFAULT_ACCEPTED_IMAGE_TYPES,
} from "@/components/ui/dropzone-input";
import { useActionMutation, useActionQuery } from "@/src/hooks/action-hooks";
import { getServicesFromOrganization, updateService } from "@/src/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast";

const servicesSchema = z.object({
  services: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, "Le nom est requis"),
      description: z.string().min(1, "La description est requise"),
      duration: z.number().min(1, "La durée est requise"),
      price: z.number().min(0, "Le prix est requis"),
      image: z.string().optional(),
      organizationId: z.string().optional(),
    }),
  ),
});

export const ServicesSection = () => {
  const { data, refetch, isLoading } = useActionQuery(
    getServicesFromOrganization,
    {},
    "services",
  );

  const form = useForm<z.infer<typeof servicesSchema>>({
    resolver: zodResolver(servicesSchema),
    defaultValues: {
      services: [],
    },
    values: {
      services:
        data?.map((service) => ({
          id: service.id,
          name: service.name || "",
          description: service.description || "",
          duration: service.duration || 30,
          price: service.price || 0,
        })) || [],
    },
  });

  const { control, handleSubmit, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const { mutateAsync } = useActionMutation(updateService, {
    onSuccess: () => {
      toast.success("Services mis à jour avec succès!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await Promise.all(data.services.map((service) => mutateAsync(service)));
  });

  const {} = useFormChangeToast({
    form,
    onSubmit,
    description: "Modification des services",
    message: "Des modifications ont été apportées aux services !",
    position: "bottom-center",
  });

  const ServiceSkeleton = () => (
    <div
      className={cn(
        "group relative rounded-2xl border bg-card",
        "dark:bg-gray-950/50 dark:backdrop-blur-xl",
      )}
    >
      <div className="relative w-full h-48 rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-[80px] w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-40" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <ServiceSkeleton key={i} />
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-10 w-48" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Vos Services</h2>
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
            </div>

            {fields.length === 0 ? (
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
                  "w-full flex flex-col items-center justify-center gap-4 p-8",
                  "rounded-2xl border-2 border-dashed",
                  "text-gray-500 hover:text-primary hover:border-primary",
                  "transition-colors duration-200",
                )}
              >
                <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-900">
                  <Plus className="h-6 w-6" />
                </div>
                <span>Ajouter votre premier service</span>
              </button>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className={cn(
                      "group relative rounded-2xl border bg-card transition-all duration-300",
                      "hover:shadow-lg hover:scale-[1.02] hover:border-primary/50",
                      "dark:bg-gray-950/50 dark:backdrop-blur-xl",
                    )}
                  >
                    <FormField
                      control={control}
                      name={`services.${index}.image`}
                      render={({ field: imageField }) => (
                        <div className="relative w-full h-48 rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                          {imageField.value ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={imageField.value}
                                alt="Aperçu du service"
                                fill
                                className="object-cover"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 p-2 bg-red-500/80 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => imageField.onChange("")}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <DropzoneInput
                              onFilesChanged={(files) => {
                                if (files.length > 0) {
                                  imageField.onChange(files[0]);
                                }
                              }}
                              value={imageField.value ? [imageField.value] : []}
                              uploadEndpoint="imageUploader"
                              acceptedFileTypes={DEFAULT_ACCEPTED_IMAGE_TYPES}
                              placeholder={{
                                dragActive: "Déposez l'image ici",
                                dragInactive:
                                  "Glissez-déposez une image ici, ou cliquez pour sélectionner",
                                fileTypes: "JPEG, PNG - 5MB max",
                              }}
                            />
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

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={control}
                            name={`services.${index}.duration`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type="number"
                                      placeholder="Durée"
                                      className="pl-9"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      }
                                    />
                                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={control}
                            name={`services.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type="number"
                                      placeholder="Prix"
                                      className="pl-9"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                      }
                                    />
                                    <Euro className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
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
              </div>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
};
