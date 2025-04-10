"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle, Trash2, User, Mail, Phone, MapPin, Globe, PawPrint, X, ChevronRight } from "lucide-react"
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui"

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
  pets: z
    .array(
      z.object({
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
      })
    )
    .default([]),
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

// Composant PetSheet pour ajouter/modifier un animal
function PetSheet({
  open,
  onOpenChange,
  petIndex,
  onSave,
  defaultValues,
  isEditing,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  petIndex: number | null
  onSave: (petData: any, index?: number) => void
  defaultValues?: any
  isEditing: boolean
}) {
  const petForm = useForm({
    resolver: zodResolver(
      z.object({
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
      })
    ),
    defaultValues: defaultValues || {
      name: "",
      type: "Dog",
      weight: 0,
      height: 0,
      breed: "",
      gender: "Male",
      birthDate: "",
      description: "",
      nacType: "",
    },
  })

  const showNacField = petForm.watch("type") === "NAC"

  const handleSave = (data: any) => {
    onSave(data, petIndex !== null ? petIndex : undefined)
    petForm.reset()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Modifier l'animal" : "Ajouter un animal"}</SheetTitle>
          <SheetDescription>
            {isEditing ? "Modifiez les informations de votre animal" : "Ajoutez un nouvel animal à votre client"}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Form {...petForm}>
            <form onSubmit={petForm.handleSubmit(handleSave)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={petForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={petForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
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
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={petForm.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poids (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={petForm.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taille (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={petForm.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Race</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={petForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
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
              </div>

              <FormField
                control={petForm.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showNacField && (
                <FormField
                  control={petForm.control}
                  name="nacType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de NAC</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={petForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 mt-6">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Carte pour afficher un animal
function PetCard({
  pet,
  index,
  onEdit,
  onDelete,
}: {
  pet: any
  index: number
  onEdit: (index: number) => void
  onDelete: (index: number) => void
}) {
  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      Dog: "Chien",
      Cat: "Chat",
      Bird: "Oiseau",
      Horse: "Cheval",
      Cow: "Vache",
      NAC: "NAC",
    }
    return types[type] || type
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Dog: "bg-amber-100 text-amber-800",
      Cat: "bg-purple-100 text-purple-800",
      Bird: "bg-sky-100 text-sky-800",
      Horse: "bg-emerald-100 text-emerald-800",
      Cow: "bg-indigo-100 text-indigo-800",
      NAC: "bg-pink-100 text-pink-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden">
        <CardHeader className="p-3 pb-2 flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-base">{pet.name}</CardTitle>
            <CardDescription className="text-xs mt-1">
              <Badge className={`${getTypeColor(pet.type)} mr-1`}>{getTypeLabel(pet.type)}</Badge>
              {pet.breed}
            </CardDescription>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onEdit(index)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onDelete(index)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  )
}

const ClientDialog = ({ open, onOpenChange }: ClientDialogProps) => {
  const router = useRouter()
  const [petSheetOpen, setPetSheetOpen] = useState(false)
  const [editingPetIndex, setEditingPetIndex] = useState<number | null>(null)

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

  const { fields, append, remove, update } = useFieldArray({
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

  const handleAddPet = () => {
    setEditingPetIndex(null)
    setPetSheetOpen(true)
  }

  const handleEditPet = (index: number) => {
    setEditingPetIndex(index)
    setPetSheetOpen(true)
  }

  const handleSavePet = (petData: any, index?: number) => {
    if (index !== undefined) {
      update(index, petData)
    } else {
      append(petData)
    }
  }

  return (
    <>
      <Credenza open={open} onOpenChange={onOpenChange}>
        <CredenzaContent className="sm:max-w-[600px] p-0 overflow-hidden">
          <CredenzaHeader className="p-6 pb-2">
            <CredenzaTitle>Créer un nouveau client</CredenzaTitle>
            <CredenzaDescription>Ajoutez un nouveau client à votre tableau de bord.</CredenzaDescription>
          </CredenzaHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="px-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" placeholder="John Doe" {...field} />
                            </div>
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
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" placeholder="john@example.com" type="email" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" placeholder="+33 6 12 34 56 78" {...field} />
                            </div>
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
                            <div className="relative">
                              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" placeholder="Paris" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pays</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="France" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Pets Section */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <PawPrint className="h-5 w-5 text-primary" />
                      <h3 className="text-base font-medium">Animaux ({fields.length})</h3>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddPet} className="h-8">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Ajouter
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                    <AnimatePresence initial={false}>
                      {fields.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-md">
                          Aucun animal ajouté pour ce client
                        </div>
                      ) : (
                        fields.map((pet, index) => (
                          <PetCard key={pet.id} pet={pet} index={index} onEdit={handleEditPet} onDelete={remove} />
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-3 p-4 bg-muted/20 border-t">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Création..." : "Créer le client"}
                </Button>
              </div>
            </form>
          </Form>
        </CredenzaContent>
      </Credenza>

      <PetSheet
        open={petSheetOpen}
        onOpenChange={setPetSheetOpen}
        petIndex={editingPetIndex}
        onSave={handleSavePet}
        defaultValues={editingPetIndex !== null ? fields[editingPetIndex] : undefined}
        isEditing={editingPetIndex !== null}
      />
    </>
  )
}

export default ClientDialog
