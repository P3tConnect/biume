"use client"

import { useMutation } from "@tanstack/react-query"
import { ImageIcon, Loader2, X, PenBox, Trash2 } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { addImagesToOrganization, updateOrganization } from "@/src/actions/organization.action"
import { useUploadThing } from "@/src/lib/uploadthing"
import { cn } from "@/src/lib/utils"

interface ImagesFormProps {
  onSuccess: () => void
  onBack: () => void
  currentLogo?: string
}

interface ImagesProps {
  name: string
  url: string
}

const MAX_LOGO_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_LOGO_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
}

export default function ImagesForm({ onSuccess, onBack, currentLogo = "" }: ImagesFormProps) {
  const [images, setImages] = useState<ImagesProps[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Logo state
  const [logo, setLogo] = useState<string>(currentLogo)
  const [logoIsUploading, setLogoIsUploading] = useState(false)
  const [logoUploadProgress, setLogoUploadProgress] = useState(0)

  // Images upload
  const { startUpload } = useUploadThing("documentsUploader", {
    onUploadProgress: progress => {
      setUploadProgress(progress)
    },
  })

  // Logo upload
  const { startUpload: startLogoUpload } = useUploadThing("documentsUploader", {
    onClientUploadComplete: res => {
      if (res && res[0]) {
        setLogo(res[0].url)
        toast.success("Logo téléchargé avec succès!")
        setLogoIsUploading(false)
      }
    },
    onUploadProgress(p) {
      setLogoUploadProgress(p)
    },
    onUploadError: error => {
      toast.error(`Erreur: ${error.message}`)
      setLogoIsUploading(false)
    },
  })

  // Logo dropzone
  const {
    getRootProps: getLogoRootProps,
    getInputProps: getLogoInputProps,
    isDragActive: isLogoDragActive,
  } = useDropzone({
    accept: ACCEPTED_LOGO_TYPES,
    maxSize: MAX_LOGO_SIZE,
    multiple: false,
    onDrop: async acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setLogoIsUploading(true)
        toast.info("Téléchargement du logo en cours...")
        await startLogoUpload(acceptedFiles)
      }
    },
  })

  // Images dropzone
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

  const { mutateAsync: saveImages } = useMutation({
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

  const { mutateAsync: updateLogo } = useMutation({
    mutationFn: (logoUrl: string) =>
      updateOrganization({
        logo: logoUrl,
      }),
    onSuccess: () => {
      toast.success("Logo enregistré avec succès.")
    },
    onError: error => {
      toast.error(`Erreur lors de l'enregistrement du logo: ${error.message}`)
    },
  })

  const handleSubmit = async () => {
    setIsLoading(true)

    // Save logo if changed
    if (logo !== currentLogo) {
      try {
        await updateLogo(logo)
      } catch (error) {
        setIsLoading(false)
        return
      }
    }

    // Save images
    if (images.length > 0) {
      await saveImages({ images })
    } else {
      setIsLoading(false)
      onSuccess()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Contenu scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          {/* Logo Section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Logo de l&apos;entreprise</h2>
            <div className="flex justify-start">
              <div className="w-full max-w-[180px] mb-2">
                {logo === "" && !logoIsUploading ? (
                  <div
                    {...getLogoRootProps()}
                    className={cn(
                      "h-[180px] border-2 border-dashed border-border hover:border-primary/50 rounded-lg transition-all bg-muted/30 hover:bg-muted/50 flex items-center justify-center",
                      isLogoDragActive && "border-primary bg-primary/5"
                    )}
                  >
                    <input {...getLogoInputProps()} />
                    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Glissez votre logo ou cliquez pour sélectionner</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG (max 5MB)</p>
                    </div>
                  </div>
                ) : logoIsUploading ? (
                  <div className="h-[180px] rounded-lg border-2 flex items-center justify-center bg-muted/30">
                    <div className="w-24 h-8 relative">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300 rounded-full"
                          style={{ width: `${logoUploadProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="group relative h-[180px] rounded-lg overflow-hidden border-2 bg-muted/30">
                    <Image src={logo} alt="logo" fill className="object-contain" />
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div {...getLogoRootProps()} className="w-full h-full absolute inset-0">
                        <input {...getLogoInputProps()} />
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="relative z-10"
                        onClick={e => {
                          e.stopPropagation()
                          const input = document.createElement("input")
                          input.type = "file"
                          input.accept = "image/jpeg, image/png"
                          input.click()
                          input.onchange = e => {
                            if (input.files && input.files.length > 0) {
                              setLogoIsUploading(true)
                              toast.info("Téléchargement du logo en cours...")
                              startLogoUpload(Array.from(input.files))
                            }
                          }
                        }}
                      >
                        <PenBox size={14} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="relative z-10"
                        onClick={e => {
                          e.stopPropagation()
                          setLogo("")
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Images Section */}
          <div>
            <h2 className="text-lg font-medium mb-4">Images de votre entreprise</h2>
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
        </div>
      </div>

      {/* Footer fixe */}
      <div className="border-t border-border p-6 bg-background mt-auto">
        <div className="flex justify-between items-center">
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
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>En cours...</span>
                </>
              ) : (
                "Suivant →"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
