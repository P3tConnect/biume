import {
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";

import { Form, FormItem } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Service, CreateService } from "@/src/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Clock, Euro, X, ImageIcon } from "lucide-react";
import { DropzoneInput } from "@/components/ui/dropzone-input";
import { DEFAULT_ACCEPTED_IMAGE_TYPES } from "@/components/ui/dropzone-input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createService, updateService } from "@/src/actions";
import Image from "next/image";
import { Credenza, CredenzaTitle, CredenzaHeader } from "@/components/ui";
import { CredenzaContent } from "@/components/ui";
import { cn } from "@/src/lib";
import { useMutation } from "@tanstack/react-query";

const servicesSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  duration: z.number().min(1, "La durée est requise"),
  price: z.number().min(0, "Le prix est requis"),
  image: z.string().nullable().optional(),
  organizationId: z.string().optional(),
});

interface ServiceFormProps {
  service: Partial<Service> | Service;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ServiceForm = ({
  service,
  open,
  onOpenChange,
}: ServiceFormProps) => {
  const form = useForm<z.infer<typeof servicesSchema>>({
    resolver: zodResolver(servicesSchema),
    defaultValues: {
      id: service.id,
      name: service.name || "",
      description: service.description || "",
      duration: service.duration || 30,
      price: service.price || 0,
      image: service.image ?? undefined,
      organizationId: service.organizationId ?? undefined,
    },
  });

  const isCreating = !service.id;

  const { mutateAsync: createMutation } = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      toast.success("Service créé avec succès!");
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: updateMutation } = useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      toast.success("Service mis à jour avec succès!");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (isCreating) {
      await createMutation(data);
    } else {
      await updateMutation(data);
    }
  });

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="max-w-3xl">
        <CredenzaHeader className="pb-6">
          <CredenzaTitle className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
            {isCreating ? "Créer un service" : "Modifier le service"}
          </CredenzaTitle>
          <p className="text-muted-foreground mt-2">
            Remplissez les informations ci-dessous pour{" "}
            {isCreating ? "créer" : "modifier"} votre service.
          </p>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <div
              className={cn(
                "space-y-6",
                "hover:shadow-lg hover:border-primary/20",
                "transition-all duration-300",
              )}
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Image du service
                    </FormLabel>
                    <FormDescription className="text-sm text-muted-foreground">
                      Ajoutez une image représentative de votre service. Format
                      JPEG ou PNG, 5MB maximum.
                    </FormDescription>
                    <FormControl>
                      <div className="relative h-56 w-full rounded-xl overflow-hidden">
                        {field.value ? (
                          <div className="relative w-full h-full group">
                            <Image
                              src={field.value}
                              alt="Aperçu du service"
                              fill
                              className="object-cover rounded-xl"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="text-white"
                                onClick={() => field.onChange("")}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Supprimer l&apos;image
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="group relative h-full w-full">
                            <DropzoneInput
                              onFilesChanged={(files) => {
                                if (files.length > 0) {
                                  field.onChange(files[0]);
                                }
                              }}
                              value={
                                field.value
                                  ? [{ url: field.value, name: field.value }]
                                  : []
                              }
                              uploadEndpoint="imageUploader"
                              acceptedFileTypes={DEFAULT_ACCEPTED_IMAGE_TYPES}
                              placeholder={{
                                dragActive: "Relâchez pour ajouter l'image",
                                dragInactive: "Déposez votre image ici",
                                fileTypes: "JPEG, PNG - 5MB max",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-6 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Nom du service
                      </FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        Donnez un nom clair et concis à votre service.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="ex: Consultation vétérinaire"
                          className="bg-transparent border-gray-200 dark:border-gray-800 focus-visible:ring-1 focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Description
                      </FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        Décrivez en détail ce que comprend votre service.
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Détaillez votre service..."
                          className="min-h-[120px] resize-none bg-transparent border-gray-200 dark:border-gray-800 focus-visible:ring-1 focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Durée (minutes)
                        </FormLabel>
                        <FormDescription className="text-sm text-muted-foreground">
                          Temps nécessaire pour ce service
                        </FormDescription>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="30"
                              className="pl-9 bg-transparent border-gray-200 dark:border-gray-800 focus-visible:ring-1 focus-visible:ring-primary"
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
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Prix (€)
                        </FormLabel>
                        <FormDescription className="text-sm text-muted-foreground">
                          Tarif du service
                        </FormDescription>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="50"
                              className="pl-9 bg-transparent border-gray-200 dark:border-gray-800 focus-visible:ring-1 focus-visible:ring-primary"
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

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="min-w-[120px] bg-primary/90 hover:bg-primary"
              >
                {isCreating ? "Créer le service" : "Enregistrer"}
              </Button>
            </div>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
};
