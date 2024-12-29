"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { useUploadThing } from "@/src/lib/uploadthing"
import { toast } from "sonner"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = {
    "application/pdf": [".pdf"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"]
}

const kybFormSchema = z.object({
    siren: z
        .string()
        .min(9, "Le numéro SIREN doit contenir 9 chiffres")
        .max(14, "Le numéro SIRET doit contenir 14 chiffres")
        .regex(/^\d+$/, "Le numéro doit contenir uniquement des chiffres"),
    siret: z
        .string()
        .min(14, "Le numéro SIRET doit contenir 14 chiffres")
        .max(14, "Le numéro SIRET doit contenir 14 chiffres")
        .regex(/^\d+$/, "Le numéro doit contenir uniquement des chiffres"),
    documents: z
        .array(z.instanceof(File))
        .min(1, "Veuillez télécharger au moins un document")
        .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE),
            "La taille maximale par fichier est de 5MB")
})

type KybFormValues = z.infer<typeof kybFormSchema>

export function DocumentsForm() {
    const form = useForm<KybFormValues>({
        resolver: zodResolver(kybFormSchema),
        defaultValues: {
            siren: "",
            siret: "",
            documents: [],
        },
    })

    const { startUpload, isUploading } = useUploadThing("documentsUploader", {
        onClientUploadComplete: () => {
            toast.success("Documents téléchargés avec succès")
        },
        onUploadError: (error: { message: string }) => {
            toast.error("Erreur lors du téléchargement: " + error.message)
        },
    })

    async function onSubmit(data: KybFormValues) {
        try {
            // Upload des fichiers d'abord
            const uploadedFiles = await startUpload(data.documents)
            if (!uploadedFiles) {
                throw new Error("Échec du téléchargement des fichiers")
            }

            // Envoi des données du formulaire avec les URLs des fichiers

            toast.success("Formulaire soumis avec succès")
        } catch (error) {
            toast.error("Une erreur est survenue")
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="documents"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Documents justificatifs</FormLabel>
                            <FormControl>
                                <DropzoneInput
                                    onFilesChanged={(files) => field.onChange(files)}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormDescription>
                                Ajoutez votre extrait Kbis ou tout autre document prouvant l&apos;identité de votre entreprise (PDF, JPEG, PNG - 5MB max)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="siren"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numéro SIREN/SIRET</FormLabel>
                            <FormControl>
                                <Input placeholder="123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="siret"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Numéro SIREN/SIRET</FormLabel>
                            <FormControl>
                                <Input placeholder="123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

interface DropzoneInputProps {
    onFilesChanged: (files: File[]) => void
    value: File[]
}

function DropzoneInput({ onFilesChanged, value }: DropzoneInputProps) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: ACCEPTED_FILE_TYPES,
        maxSize: MAX_FILE_SIZE,
        onDrop: (acceptedFiles) => {
            onFilesChanged([...value, ...acceptedFiles])
        },
    })

    const removeFile = (fileToRemove: File) => {
        onFilesChanged(value.filter(file => file !== fileToRemove))
    }

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-lg p-6 cursor-pointer",
                    "hover:border-primary/50 transition-colors",
                    isDragActive && "border-primary bg-primary/5",
                )}
            >
                <input {...getInputProps()} />
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        {isDragActive
                            ? "Déposez les fichiers ici"
                            : "Glissez-déposez vos fichiers ici, ou cliquez pour sélectionner"}
                    </p>
                </div>
            </div>

            {value.length > 0 && (
                <ul className="space-y-2">
                    {value.map((file, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between p-2 bg-muted rounded-md"
                        >
                            <span className="text-sm truncate">
                                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(file)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
