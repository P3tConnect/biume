import { ProfileCoverSection } from "./components/profile/profile-cover-section";
import { ProfileMainInfoSection } from "./components/profile/profile-main-info-section";
import { ProfileLegalInfoSection } from "./components/profile/profile-legal-info-section";
import { ProfileScheduleSection } from "./components/profile/profile-schedule-section";
import { ProfileServicesSection } from "./components/profile/profile-services-section";
import { getCurrentOrganization } from "@/src/actions/organization.action";
import { z } from "zod";
import { Suspense } from "react";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const organizationFormSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom de l'organisation doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  website: z.string().url().optional(),
  address: z.string().min(5, "Veuillez entrer une adresse valide"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  logo: z
    .any()
    .refine(
      (file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE),
      {
        message: "Le fichier doit faire moins de 5MB",
      },
    )
    .refine(
      (file) =>
        !file ||
        (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      {
        message: "Format accepté : .jpg, .jpeg, .png et .webp",
      },
    )
    .optional(),
  openAt: z.string(),
  closeAt: z.string(),
  atHome: z.boolean(),
  nac: z.string(),
  siren: z.string().length(9, "Le numéro SIREN doit contenir 9 chiffres"),
  siret: z.string().length(14, "Le numéro SIRET doit contenir 14 chiffres"),
});

export const organizationImagesFormSchema = z.object({
  logo: z.string().optional(),
});

export const ProfileSection = async () => {
  const data = await getCurrentOrganization({});

  return (
    <Suspense fallback={"Loading ..."}>
      <div className="relative">
        <ProfileCoverSection org={data} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-5">
          <div className="md:col-span-2 space-y-6">
            <ProfileMainInfoSection org={data} />
            <ProfileLegalInfoSection org={data} />
          </div>

          <div className="space-y-6">
            <ProfileScheduleSection org={data} />
            <ProfileServicesSection org={data} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};
