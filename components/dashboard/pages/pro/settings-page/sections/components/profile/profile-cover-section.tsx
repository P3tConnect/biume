"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateOrganizationImages } from "@/src/actions/organization.action"
import { Organization } from "@/src/db"
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast"
import { useUploadThing } from "@/src/lib/uploadthing"

import { organizationImagesFormSchema } from "../../profile-section"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

interface ProfileCoverSectionProps {
  org: Organization | null | undefined
}

export const ProfileCoverSection = ({ org }: ProfileCoverSectionProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(org?.logo || null)
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm<z.infer<typeof organizationImagesFormSchema>>({
    resolver: zodResolver(organizationImagesFormSchema),
    values: {
      logo: org?.logo || "",
    },
  })

  const { handleSubmit } = form

  const { mutateAsync: updateImages } = useMutation({
    mutationFn: updateOrganizationImages,
    onSuccess: () => {
      toast.success("Images modifiées avec succès!")
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  const onSubmit = handleSubmit(async data => {
    await updateImages(data)
  })

  useFormChangeToast({
    form,
    onSubmit,
    message: "Images en attente",
    description: "Pensez à sauvegarder vos changements",
    position: "bottom-center",
  })

  const { startUpload } = useUploadThing("documentsUploader", {
    onClientUploadComplete: async res => {
      if (res && res[0]) {
        const url = res[0].url
        if (isUploading) {
          setPreviewUrl(url)
          toast.success("Logo téléchargé et modifié avec succès!")
        }
      }
      setIsUploading(false)
    },
    onUploadError: error => {
      toast.error(`Erreur: ${error.message}`)
      setIsUploading(false)
    },
  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        setIsUploading(true)
        await startUpload([file])
      } catch (error) {
        console.error("Error uploading file:", error)
        toast.error("Erreur lors du téléchargement du fichier")
        setIsUploading(false)
      }
    }
  }

  return (
    <Form {...form}>
      <div className="flex items-center justify-start">
        <div className="relative w-32 h-32">
          <div className="w-full h-full rounded-full shadow-lg">
            {previewUrl || org?.logo ? (
              <Image src={previewUrl || org?.logo || ""} alt="Logo" fill className="object-cover rounded-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-full border border-muted">
                <p className="text-sm text-muted-foreground text-center px-4">Ajoutez votre logo</p>
              </div>
            )}
          </div>
          <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full">
            <Input
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              onChange={handleImageChange}
              className="hidden rounded-full"
              disabled={isUploading}
            />
            <p className="text-white text-xs font-medium">Modifier le logo</p>
          </label>
        </div>
        <div className="ml-8">
          <h2 className="text-xl font-semibold">{org?.name || "Votre entreprise"}</h2>
          <p className="text-sm text-muted-foreground mt-1">Personnalisez votre profil professionnel</p>
        </div>
      </div>
    </Form>
  )
}
