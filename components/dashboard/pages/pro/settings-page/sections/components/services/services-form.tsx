import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Clock, Euro, Users, X } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Credenza, CredenzaHeader, CredenzaTitle } from "@/components/ui"
import { CredenzaContent } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { DropzoneInput } from "@/components/ui/dropzone-input"
import { DEFAULT_ACCEPTED_IMAGE_TYPES } from "@/components/ui/dropzone-input"
import { FormControl, FormDescription, FormLabel, FormMessage } from "@/components/ui/form"
import { Form, FormItem } from "@/components/ui/form"
import { FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createService, updateService } from "@/src/actions"
import { Service } from "@/src/db"
import { cn } from "@/src/lib"

const servicesSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  duration: z.number().min(1, "La durée est requise"),
  price: z.number().min(0, "Le prix est requis"),
  image: z.string().nullable().optional(),
  organizationId: z.string().optional(),
  type: z.enum(["ONE_TO_ONE", "MULTIPLE"]).default("ONE_TO_ONE"),
})

interface ServiceFormProps {
  service: Partial<Service> | Service
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ServiceForm = ({ service, open, onOpenChange }: ServiceFormProps) => {
  const queryClient = useQueryClient()
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
      type: service.type || "ONE_TO_ONE",
    },
  })

  const { handleSubmit, reset } = form

  const isCreating = !service.id

  const { mutateAsync: createMutation } = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      toast.success("Service créé avec succès!")
      queryClient.invalidateQueries({ queryKey: ["organization-services"] })
      onOpenChange(false)
      reset()
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  const { mutateAsync: updateMutation } = useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      toast.success("Service mis à jour avec succès!")
      onOpenChange(false)
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  const onSubmit = handleSubmit(async data => {
    if (isCreating) {
      await createMutation(data)
    } else {
      await updateMutation(data)
    }
  })

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="max-w-3xl">
        <CredenzaHeader className="pb-3">
          <CredenzaTitle className="text-xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
            {isCreating ? "Créer un service" : "Modifier le service"}
          </CredenzaTitle>
          <p className="text-muted-foreground text-sm">
            Remplissez les informations ci-dessous pour {isCreating ? "créer" : "modifier"} votre service.
          </p>
        </CredenzaHeader>

        <div className="max-h-[calc(85vh-10rem)] overflow-y-auto pr-2 -mr-2">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <div
                className={cn("space-y-4", "hover:shadow-lg hover:border-primary/20", "transition-all duration-300")}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Image du service - première colonne */}
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Image du service</FormLabel>
                        <FormControl>
                          <div className="relative h-40 w-full rounded-xl overflow-hidden">
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
                                    <X className="h-4 w-4 mr-1" />
                                    Supprimer
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="group relative h-full w-full">
                                <DropzoneInput
                                  onFilesChanged={files => {
                                    if (files.length > 0) {
                                      field.onChange(files[0])
                                    }
                                  }}
                                  value={
                                    field.value
                                      ? [
                                          {
                                            url: field.value,
                                            name: field.value,
                                          },
                                        ]
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
                        <FormDescription className="text-xs text-muted-foreground mt-1">
                          Format JPEG ou PNG, 5MB maximum.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  {/* Informations de base - deuxième colonne */}
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Nom du service</FormLabel>
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

                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold">Durée (min)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  placeholder="30"
                                  className="pl-9 bg-transparent border-gray-200 dark:border-gray-800 focus-visible:ring-1 focus-visible:ring-primary"
                                  {...field}
                                  onChange={e => field.onChange(Number(e.target.value))}
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
                            <FormLabel className="text-sm font-semibold">Prix (€)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  placeholder="50"
                                  className="pl-9 bg-transparent border-gray-200 dark:border-gray-800 focus-visible:ring-1 focus-visible:ring-primary"
                                  {...field}
                                  onChange={e => field.onChange(Number(e.target.value))}
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

                {/* Description - pleine largeur */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Détaillez votre service..."
                          className="min-h-[100px] resize-none bg-transparent border-gray-200 dark:border-gray-800 focus-visible:ring-1 focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Switch pour plusieurs animaux */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-xl border border-gray-200 dark:border-gray-800 p-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <FormLabel className="text-sm font-normal mb-0">Accueille plusieurs animaux</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value === "MULTIPLE"}
                          onCheckedChange={val => field.onChange(val ? "MULTIPLE" : "ONE_TO_ONE")}
                        />
                      </FormControl>
                      <FormDescription className="hidden">
                        Activez cette option si ce service peut accueillir plusieurs animaux lors d'une même séance.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 mt-3 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Annuler
                </Button>
                <Button type="submit" className="min-w-[120px] bg-primary/90 hover:bg-primary">
                  {isCreating ? "Créer" : "Enregistrer"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CredenzaContent>
    </Credenza>
  )
}
