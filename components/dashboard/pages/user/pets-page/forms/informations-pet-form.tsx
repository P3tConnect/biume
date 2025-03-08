"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { ImageIcon, PenBox, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

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
import { createPet, updatePet } from "@/src/actions/pet.action"
import { CreatePetSchema, Pet } from "@/src/db/pets"
import { cn } from "@/src/lib"
import { useUploadThing } from "@/src/lib/uploadthing"

import { usePetContext } from "../context/pet-context"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
}

interface InformationsPetFormProps {
  nextStep: () => void
  previousStep: () => void
  petData?: Pet | null
  isUpdate?: boolean
}

const InformationsPetForm = ({ nextStep, previousStep, petData, isUpdate = false }: InformationsPetFormProps) => {
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

  const { handleSubmit } = form

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
      <form onSubmit={onSubmit} className="space-y-6">
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
                    <FormLabel>Nom</FormLabel>
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
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toLocaleDateString("fr-FR").split("/").reverse().join("-")
                            : ""
                        }
                        onChange={e => {
                          const date = e.target.value ? new Date(e.target.value) : null
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
                    <FormLabel>Type d&apos;animal</FormLabel>
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
                    <FormLabel>Sexe</FormLabel>
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
                  <FormLabel>Poids (kg)</FormLabel>
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
                  <FormLabel>Taille (cm)</FormLabel>
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
                  <FormLabel>Race</FormLabel>
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
                <FormLabel>Description</FormLabel>
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

        <div className="flex justify-end pt-2">
          <Button type="submit">Suivant</Button>
        </div>
      </form>
    </Form>
  )
}

export default InformationsPetForm
