"use client"

import {
  Button,
  DatePicker,
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
import { FileText, ImageIcon, PawPrint, PenBox, Ruler, Trash2 } from "lucide-react"

import { CreatePetSchema } from "@/src/db/pets"
import Image from "next/image"
import { cn } from "@/src/lib"
import { createPet } from "@/src/actions"
import { toast } from "sonner"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useUploadThing } from "@/src/lib/uploadthing"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
}

export default function PetCreationStep({ onSkip }: { onSkip: () => void }) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const form = useForm<z.infer<typeof CreatePetSchema>>({
    resolver: zodResolver(CreatePetSchema),
    defaultValues: {
      name: "",
      type: "Dog",
      gender: "Male",
      breed: "",
      image: "",
      birthDate: new Date(),
      description: "",
      weight: 0,
      height: 0,
      chippedNumber: undefined,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      toast.success("Animal ajouté avec succès")
      form.reset()
      onSkip()
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création de l'animal")
    },
  })

  const { startUpload } = useUploadThing("documentsUploader", {
    onClientUploadComplete: res => {
      if (res && res[0]) {
        form.setValue("image", res[0].url)
        toast.success("Image téléchargée avec succès!")
      }
    },
    onUploadProgress(p) {
      setUploadProgress(p)
    },
    onUploadError: error => {
      toast.error(`Erreur: ${error.message}`)
    },
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDrop: async acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setIsUploading(true)
        toast.info("Téléchargement de l'image en cours...")
        await startUpload(acceptedFiles)
        setIsUploading(false)
      }
    },
  })

  const onSubmit = (data: z.infer<typeof CreatePetSchema>) => {
    mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Section principale */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Informations de base */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <PawPrint className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">Informations générales</h3>
            </div>

            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de votre animal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Type d'animal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Dog">Chien</SelectItem>
                          <SelectItem value="Cat">Chat</SelectItem>
                          <SelectItem value="Hamster">Hamster</SelectItem>
                          <SelectItem value="Bird">Oiseau</SelectItem>
                          <SelectItem value="Rabbit">Lapin</SelectItem>
                          <SelectItem value="Horse">Cheval</SelectItem>
                          <SelectItem value="Snake">Serpent</SelectItem>
                          <SelectItem value="Turtle">Tortue</SelectItem>
                          <SelectItem value="Lizard">Lézards</SelectItem>
                          <SelectItem value="Fish">Poisson</SelectItem>
                          <SelectItem value="Pig">Cochons d&apos;Inde</SelectItem>
                          <SelectItem value="Fur">Furets</SelectItem>
                          <SelectItem value="Gerbille">Gerbilles</SelectItem>
                          <SelectItem value="Rat">Rats / Souris domestiques</SelectItem>
                          <SelectItem value="Octodons">Octodons</SelectItem>
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
                      <FormLabel>Genre</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Genre" />
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
                control={form.control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race</FormLabel>
                    <FormControl>
                      <Input placeholder="Race" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">Photo</h3>
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={cn(
                        "relative flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed transition-colors",
                        isDragActive && "border-primary bg-secondary/20",
                        field.value && "border-primary"
                      )}
                    >
                      <input {...getInputProps()} />
                      {field.value ? (
                        <div className="relative h-full w-full">
                          <Image src={field.value} alt="Aperçu" className="rounded-lg object-cover" fill />
                          <div className="absolute right-2 top-2 flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={e => {
                                e.stopPropagation()
                                const input = document.createElement("input")
                                input.type = "file"
                                input.accept = "image/*"
                                input.onchange = async e => {
                                  const file = (e.target as HTMLInputElement)?.files?.[0]
                                  if (file) {
                                    setIsUploading(true)
                                    await startUpload([file])
                                    setIsUploading(false)
                                  }
                                }
                                input.click()
                              }}
                            >
                              <PenBox className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={e => {
                                e.stopPropagation()
                                form.setValue("image", "")
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 p-4">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Glissez une photo ou cliquez pour sélectionner
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG jusqu&apos;à 5MB</p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section détails */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Caractéristiques physiques */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">Caractéristiques physiques</h3>
            </div>

            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <DatePicker
                        label="Date de naissance"
                        date={field.value}
                        onSelect={date => field.onChange(date)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poids (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Poids"
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
                          placeholder="Taille"
                          {...field}
                          value={field.value ?? ""}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="chippedNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro pucé (oreille)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Numéro de puce dans l'oreille"
                        {...field}
                        value={field.value ?? ""}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">Description</h3>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez votre animal..."
                      className="h-[250px] resize-none"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onSkip}>
            Passer cette étape
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {isPending ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Création...
              </>
            ) : (
              "Ajouter mon animal"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
