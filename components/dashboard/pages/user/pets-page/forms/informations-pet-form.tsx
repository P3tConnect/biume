"use client"

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui"
import { CreatePetSchema, Pet } from "@/src/db/pets"
import { ImageIcon, PenBox, Trash2 } from "lucide-react"
import { createPet, updatePet } from "@/src/actions/pet.action"

import Image from "next/image"
import { cn } from "@/src/lib"
import { toast } from "sonner"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { usePetContext } from "../context/pet-context"
import { useState } from "react"
import { useUploadThing } from "@/src/lib/uploadthing"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
}

interface InformationsPetFormProps {
  nextStep: () => void
  petData?: Pet | null
  isUpdate?: boolean
}

const InformationsPetForm = ({ nextStep, petData, isUpdate = false }: InformationsPetFormProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { setPetId } = usePetContext()

  const form = useForm<z.infer<typeof CreatePetSchema>>({
    resolver: zodResolver(CreatePetSchema),
    defaultValues: {
      name: petData?.name || "",
      type: petData?.type || "Dog",
      gender: petData?.gender || "Male",
      breed: petData?.breed || "",
      image: petData?.image || "",
      birthDate: petData?.birthDate ? new Date(petData.birthDate) : new Date(),
      description: petData?.description || "",
      weight: petData?.weight || 0,
      height: petData?.height || 0,
    },
  })

  const handleSubmit = form.handleSubmit

  // Ajoutons une fonction pour vérifier la validité du formulaire avant de soumettre
  const validateAndSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Déclenchons la validation du formulaire
    const isValid = await form.trigger()

    // Si le formulaire n'est pas valide, ne pas procéder
    if (!isValid) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Si le formulaire est valide, soumettre
    onSubmit(event as any)
  }

  // Mutation pour créer un animal
  const createMutation = useMutation({
    mutationFn: createPet,
    onSuccess: handleMutationSuccess,
    onError: error => {
      toast.error(`Erreur lors de la création de l'animal: ${error.message}`)
    },
  })

  // Mutation pour mettre à jour un animal
  const updateMutation = useMutation({
    mutationFn: updatePet,
    onSuccess: handleMutationSuccess,
    onError: error => {
      toast.error(`Erreur lors de la mise à jour de l'animal: ${error.message}`)
    },
  })

  // Fonction pour gérer le succès des mutations
  function handleMutationSuccess(data: any) {
    if (!data) {
      toast.error("Erreur: Données invalides")
      return
    }

    let animalId = null

    try {
      if (typeof data === "string") {
        animalId = data
      } else if (Array.isArray(data)) {
        if (data.length > 0 && data[0]?.id) {
          animalId = data[0].id
        }
      } else if (typeof data === "object") {
        if ("id" in data) {
          animalId = data.id
        } else {
          const findId = (obj: any): string | null => {
            for (const key in obj) {
              if (key === "id" && typeof obj[key] === "string") {
                return obj[key]
              } else if (typeof obj[key] === "object") {
                const found = findId(obj[key])
                if (found) return found
              }
            }
            return null
          }
          animalId = findId(data)
        }
      }

      if (!animalId) {
        toast.error("Erreur: Impossible de récupérer l'ID de l'animal")
        return
      }

      setPetId(animalId)

      if (typeof window !== "undefined") {
        localStorage.setItem("currentPetId", animalId)
      }

      toast.success(isUpdate ? "Animal mis à jour avec succès!" : "Animal créé avec succès!")
      nextStep()
    } catch (error) {
      toast.error("Erreur lors du traitement de la réponse")
    }
  }

  const onSubmit = handleSubmit(async data => {
    try {
      // Vérification explicite des champs obligatoires
      if (
        !data.name ||
        !data.birthDate ||
        !data.breed ||
        data.weight === undefined ||
        data.height === undefined ||
        !data.image ||
        !data.description ||
        !data.type ||
        !data.gender
      ) {
        // Afficher un message d'erreur
        toast.error("Veuillez remplir tous les champs obligatoires")
        return // Ne pas continuer si les champs obligatoires ne sont pas remplis
      }

      if (isUpdate && petData) {
        await updateMutation.mutateAsync({
          ...data,
          id: petData.id,
        })
      } else {
        await createMutation.mutateAsync(data)
      }
    } catch (error) {
      toast.error("Erreur lors de la soumission:")
    }
  })

  const { startUpload: startImageUpload } = useUploadThing("documentsUploader", {
    onClientUploadComplete: res => {
      if (res && res[0]) {
        form.setValue("image", res[0].url)
        toast.success("Image téléchargé avec succès!")
      }
    },
    onUploadProgress(p) {
      setUploadProgress(p)
    },
    onUploadError: error => {
      toast.error(`Erreur: ${error.message}`)
    },
  })

  const {
    getRootProps: getLogoRootProps,
    getInputProps: getLogoInputProps,
    isDragActive: isLogoDragActive,
  } = useDropzone({
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDrop: async acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setIsUploading(true)
        toast.info("Téléchargement de l'image en cours...")
        await startImageUpload(acceptedFiles)
        setIsUploading(false)
      }
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={validateAndSubmit} className="space-y-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4 space-y-2">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col items-start gap-4">
                      {form.getValues("image") == "" ? (
                        <div className="w-full">
                          <div
                            {...getLogoRootProps()}
                            className={cn(
                              "w-full h-40 border-2 border-dashed border-primary/20 rounded-2xl transition-all bg-background/50 hover:bg-primary/5",
                              isLogoDragActive && "border-primary bg-primary/5"
                            )}
                          >
                            <input {...getLogoInputProps()} />
                            <div className="flex flex-col items-center justify-center h-full gap-2">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <ImageIcon className="h-6 w-6 text-primary" />
                              </div>
                              <div className="space-y-1 text-center">
                                <p className="text-xs font-medium text-primary">Glissez-déposez</p>
                                <p className="text-xs text-muted-foreground">ou cliquez</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG • 5MB</p>
                                <p className="text-xs text-red-500 font-medium">* Image obligatoire</p>
                              </div>
                            </div>
                          </div>
                          {isUploading && (
                            <div className="w-full mt-2">
                              <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all duration-300"
                                  style={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full">
                          <div className="group relative w-full h-52 rounded-2xl overflow-hidden border-2 border-primary/20">
                            <Image
                              width={200}
                              height={200}
                              src={form.getValues("image") ?? ""}
                              alt="logo"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div
                                {...getLogoRootProps()}
                                className="w-full h-full absolute inset-0 flex items-center justify-center gap-2"
                              >
                                <input {...getLogoInputProps()} />
                                <Button variant="ghost" size="icon" className="rounded-xl text-white hover:text-white">
                                  <PenBox size={16} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-xl text-white hover:text-white"
                                  onClick={e => {
                                    e.stopPropagation()
                                    form.setValue("image", "")
                                  }}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nom <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Luna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date de naissance <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value instanceof Date && !isNaN(field.value.getTime())
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={e => {
                          const value = e.target.value
                          const date = value ? new Date(value) : null
                          field.onChange(date)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Type d&apos;animal <span className="text-red-500">*</span>
                    </FormLabel>
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
                        <SelectItem value="NAC">NAC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Sexe <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le sexe" />
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
          </div>
        </div>

        {/* Caractéristiques physiques */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Caractéristiques physiques</h3>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Poids (kg) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Ex: 25.5"
                      {...field}
                      value={field.value ?? ""}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Taille (cm) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 60"
                      {...field}
                      value={field.value ?? ""}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Race <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Golden Retriever" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Décrivez votre animal..."
                    className="resize-none h-20"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground mt-4">
            <span className="text-red-500">*</span> Champs obligatoires
          </p>
          <div className="flex justify-end">
            <Button type="submit">Suivant</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default InformationsPetForm
