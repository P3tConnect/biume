"use client"

import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { z } from "zod"

import { getCurrentOrganization } from "@/src/actions/organization.action"

import { ProfileCoverSection } from "./components/profile/profile-cover-section"
import { ProfileLegalInfoSection } from "./components/profile/profile-legal-info-section"
import { ProfileMainInfoSection } from "./components/profile/profile-main-info-section"
import { ProfileOnDemandSection } from "./components/profile/profile-ondemand-section"
import { ProfileScheduleSection } from "./components/profile/profile-schedule-section"
import { ProfileServicesSection } from "./components/profile/profile-services-section"

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const organizationFormSchema = z.object({
  name: z.string().min(2, "Le nom de l'organisation doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  website: z.string().url().optional(),
  address: z.string().min(5, "Veuillez entrer une adresse valide"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  logo: z
    .any()
    .refine(file => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), {
      message: "Le fichier doit faire moins de 5MB",
    })
    .refine(file => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)), {
      message: "Format accepté : .jpg, .jpeg, .png et .webp",
    })
    .optional(),
  openAt: z.string(),
  closeAt: z.string(),
  onDemand: z.boolean().optional(),
  nac: z.string(),
  siren: z.string().length(9, "Le numéro SIREN doit contenir 9 chiffres"),
  siret: z.string().length(14, "Le numéro SIRET doit contenir 14 chiffres"),
})

export const organizationUpdateFormSchema = z.object({
  name: z.string().min(2, "Le nom de l'organisation doit contenir au moins 2 caractères").optional(),
  email: z.string().email("Veuillez entrer une adresse email valide").optional(),
  website: z.string().url().optional(),
  address: z.string().min(5, "Veuillez entrer une adresse valide").optional(),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères").optional(),
  logo: z
    .any()
    .refine(file => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), {
      message: "Le fichier doit faire moins de 5MB",
    })
    .refine(file => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)), {
      message: "Format accepté : .jpg, .jpeg, .png et .webp",
    })
    .optional(),
  openAt: z.string().optional(),
  closeAt: z.string().optional(),
  onDemand: z.boolean().optional(),
  nac: z.string().optional(),
  siren: z.string().length(9, "Le numéro SIREN doit contenir 9 chiffres").optional(),
  siret: z.string().length(14, "Le numéro SIRET doit contenir 14 chiffres").optional(),
})

export const organizationImagesFormSchema = z.object({
  logo: z.string().optional(),
})

export const ProfileSection = () => {
  const { data: org, isLoading } = useQuery({
    queryKey: ["organization-profile"],
    queryFn: () => getCurrentOrganization({}),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <ProfileCoverSection org={org?.data} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 w-full">
        <div className="md:col-span-2 space-y-6">
          <ProfileMainInfoSection org={org?.data} />
          <ProfileLegalInfoSection org={org?.data} />
        </div>

        <div className="space-y-6">
          <ProfileOnDemandSection org={org?.data} />
          <ProfileScheduleSection org={org?.data} />
          <ProfileServicesSection org={org?.data} />
        </div>
      </div>
    </div>
  )
}
