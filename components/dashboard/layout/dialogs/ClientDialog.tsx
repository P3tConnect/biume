"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Credenza, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2 } from "lucide-react"

interface ClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Le numéro de téléphone doit contenir au moins 10 chiffres.",
  }),
  city: z.string().min(2, {
    message: "La ville doit contenir au moins 2 caractères.",
  }),
  country: z.string().min(2, {
    message: "Le pays doit contenir au moins 2 caractères.",
  }),
  pets: z.array(z.object({
    name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    type: z.enum(["Dog", "Cat", "Bird", "Horse", "Cow", "NAC"], {
      message: "Veuillez sélectionner un type d'animal valide.",
    }),
    weight: z.coerce.number().min(0, { message: "Le poids doit être positif." }),
    height: z.coerce.number().min(0, { message: "La taille doit être positive." }),
    breed: z.string().min(2, { message: "La race doit contenir au moins 2 caractères." }),
    gender: z.enum(["Male", "Female"], {
      message: "Veuillez sélectionner un genre valide.",
    }),
    birthDate: z.string().min(1, { message: "La date de naissance est requise." }),
    description: z.string().optional(),
    nacType: z.string().optional(),
  })).default([])
})

type FormValues = z.infer<typeof formSchema>

// Cette fonction serait normalement importée depuis src/actions/client.action.ts
// mais pour simplifier nous la simulons ici
const createClient = async (data: FormValues) => {
  // Simulation d'un appel API
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Client créé:", {
        client: {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          city: data.city,
          country: data.country,
        },
        pets: data.pets,
      })
      resolve({ success: true, data })
    }, 1000)
  })
}

const ClientDialog = ({ open, onOpenChange }: ClientDialogProps) => {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      city: "",
      country: "",
      pets: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pets",
  })

  const mutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      toast.success("Le client a été créé avec succès")
      form.reset()
      onOpenChange(false)
      router.refresh()
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création du client")
    },
  })

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values)
  }

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="sm:max-w-[600px]">
        <CredenzaHeader>
          <CredenzaTitle>Créer un nouveau client</CredenzaTitle>
          <CredenzaDescription>Ajoutez un nouveau client et ses animaux à votre tableau de bord.</CredenzaDescription>
        </CredenzaHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="+33 6 12 34 56 78" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ville</FormLabel>
                      <FormControl>
                        <Input placeholder="Paris" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Pays</FormLabel>
                      <FormControl>
                        <Input placeholder="France" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Pets Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-700">Animaux</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({
                      name: "",
                      type: "Dog",
                      weight: 0,
                      height: 0,
                      breed: "",
                      gender: "Male",
                      birthDate: "",
                      description: "",
                      nacType: "",
                    })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter un animal
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="rounded-md border border-gray-200 p-3 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-700">Animal {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name={`pets.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Nom</FormLabel>
                            <FormControl>
                              <Input className="h-8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`pets.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="Sélectionnez un type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Dog">Chien</SelectItem>
                                <SelectItem value="Cat">Chat</SelectItem>
                                <SelectItem value="Bird">Oiseau</SelectItem>
                                <SelectItem value="Horse">Cheval</SelectItem>
                                <SelectItem value="Cow">Vache</SelectItem>
                                <SelectItem value="NAC">NAC</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`pets.${index}.weight`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Poids (kg)</FormLabel>
                            <FormControl>
                              <Input type="number" className="h-8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`pets.${index}.height`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Taille (cm)</FormLabel>
                            <FormControl>
                              <Input type="number" className="h-8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`pets.${index}.breed`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Race</FormLabel>
                            <FormControl>
                              <Input className="h-8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`pets.${index}.gender`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Genre</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-8">
                                  <SelectValue placeholder="Sélectionnez un genre" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Male">Mâle</SelectItem>
                                <SelectItem value="Female">Femelle</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`pets.${index}.birthDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Date de naissance</FormLabel>
                            <FormControl>
                              <Input type="date" className="h-8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch(`pets.${index}.type`) === "NAC" && (
                        <FormField
                          control={form.control}
                          name={`pets.${index}.nacType`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Type de NAC</FormLabel>
                              <FormControl>
                                <Input className="h-8" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name={`pets.${index}.description`}
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel className="text-xs">Description</FormLabel>
                            <FormControl>
                              <Input className="h-8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Création..." : "Créer le client"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CredenzaContent>
    </Credenza>
  )
}

export default ClientDialog
