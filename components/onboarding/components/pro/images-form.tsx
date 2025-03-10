"use client"

import { useMutation } from "@tanstack/react-query"
import { ImageIcon, Loader2, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { addImagesToOrganization } from "@/src/actions/organization.action"
import { useUploadThing } from "@/src/lib/uploadthing"
import { cn } from "@/src/lib/utils"

interface ImagesFormProps {
  onSuccess: () => void
  onBack: () => void
}

interface ImagesProps {
  name: string
  url: string
}

export default function ImagesForm({ onSuccess, onBack }: ImagesFormProps) {
  const [images, setImages] = useState<ImagesProps[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { startUpload } = useUploadThing("documentsUploader", {
    onUploadProgress: progress => {
      setUploadProgress(progress)
    },
  })

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true)
      setUploadProgress(0)
      try {
        const uploadedImages = await startUpload(acceptedFiles)
        if (uploadedImages) {
          const imageUrls = uploadedImages.map(img => ({
            name: img.name,
            url: img.url,
          }))
          setImages(prev => [...prev, ...imageUrls])
        }
      } catch (error) {
        toast.error("Une erreur est survenue lors du téléchargement des images.")
      } finally {
        setIsUploading(false)
        setUploadProgress(0)
      }
    },
    [startUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 5,
  })

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const { mutateAsync } = useMutation({
    mutationFn: addImagesToOrganization,
    onSuccess: () => {
      setIsLoading(false)
      toast.success("Images ajoutées avec succès.")
      onSuccess()
    },
    onMutate: () => {
      setIsLoading(true)
    },
    onError: error => {
      toast.error(error.message)
      setIsLoading(false)
    },
  })

  const handleSubmit = async () => {
    await mutateAsync({ images })
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/20"
        )}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Téléchargement en cours...</p>
            <div className="w-full max-w-xs space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">{Math.round(uploadProgress)}%</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
            <p>Glissez-déposez vos images ici ou cliquez pour sélectionner</p>
            <p className="text-sm text-muted-foreground">PNG, JPG, JPEG ou WEBP (max 5 images)</p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative group">
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Image
                src={image.url}
                alt={`Image ${index + 1}`}
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-48"
              />
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-4 lg:pt-8 p-4 lg:p-0 border-t">
        <Button type="button" variant="outline" className="rounded-xl" disabled={isLoading} onClick={onBack}>
          ← Précédent
        </Button>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="ghost"
            disabled={isLoading}
            onClick={onSuccess}
            className="text-muted-foreground"
          >
            Passer
          </Button>
          <Button disabled={isLoading} onClick={handleSubmit} className="rounded-xl px-6">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>En cours...</span>
              </>
            ) : (
              "Suivant →"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
