import { FormControl, FormMessage } from "@/components/ui/form";

import { Form, FormItem } from "@/components/ui/form";

import {
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form";

import { Dialog } from "@/components/ui/dialog";
import { Service } from "@/src/db";
import { useActionMutation } from "@/src/hooks/action-hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Clock, Euro, X } from "lucide-react";
import { DropzoneInput } from "@/components/ui/dropzone-input";
import { DEFAULT_ACCEPTED_IMAGE_TYPES } from "@/components/ui/dropzone-input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateService } from "@/src/actions";
import Image from "next/image";

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
  service: Service;
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

  const { mutateAsync } = useActionMutation(updateService, {
    onSuccess: () => {
      toast.success("Service mis à jour avec succès!");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le service</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                        {field.value ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={field.value}
                              alt="Aperçu du service"
                              fill
                              className="object-cover"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 p-2 bg-red-500/80 backdrop-blur-sm text-white rounded-full"
                              onClick={() => field.onChange("")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <DropzoneInput
                            onFilesChanged={(files) => {
                              if (files.length > 0) {
                                field.onChange(files[0]);
                              }
                            }}
                            value={field.value ? [field.value] : []}
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
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nom du service" {...field} />
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
                    <FormControl>
                      <Textarea
                        placeholder="Description du service..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="duration"
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
                  control={form.control}
                  name="price"
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

            <div className="flex justify-end">
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
