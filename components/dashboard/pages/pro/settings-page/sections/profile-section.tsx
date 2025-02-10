"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useUploadThing } from "@/src/lib/uploadthing";
import { toast } from "sonner";
import {
  getCurrentOrganization,
  updateOrganization,
} from "@/src/actions/organization.action";
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast";
import { useActionQuery } from "@/src/hooks/action-hooks";

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
  coverImage: z
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

export const ProfileSection = () => {
  const { data: org } = useActionQuery(getCurrentOrganization, {});
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    org?.logo || null,
  );
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    org?.coverImage || null,
  );
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    values: {
      name: org?.name || "",
      email: org?.email || "",
      website: "",
      address: org?.addressId || "",
      description: org?.description || "",
      openAt: org?.openAt || "09:00",
      closeAt: org?.closeAt || "18:00",
      atHome: org?.atHome || false,
      nac: org?.nac || "",
      siren: org?.siren || "",
      siret: org?.siret || "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateOrganization(data);
      toast.success("Modifications enregistrées avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement des modifications");
    }
  });

  // Utilisation du hook pour le toast
  const { hasChanges, isSubmitting } = useFormChangeToast({
    form,
    onSubmit,
    message: "Modifications en attente",
    description: "Pensez à sauvegarder vos changements",
    position: "bottom-center",
  });

  const { startUpload } = useUploadThing("documentsUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        form.setValue("logo", res[0].url);
        setPreviewUrl(res[0].url);
        toast.success("Logo téléchargé avec succès!");
      }
      setIsUploading(false);
    },
    onUploadError: (error) => {
      toast.error(`Erreur: ${error.message}`);
      setIsUploading(false);
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        await startUpload([file]);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Erreur lors du téléchargement du fichier");
        setIsUploading(false);
      }
    }
  };

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const result = await startUpload([file]);
        if (result && result[0]) {
          form.setValue("coverImage", result[0].url);
          setCoverPreviewUrl(result[0].url);
          toast.success("Image de couverture téléchargée avec succès!");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Erreur lors du téléchargement du fichier");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="relative pb-20">
      <div className="relative w-full h-[200px] rounded-xl overflow-visible bg-gradient-to-r from-blue-50 to-blue-100">
        {coverPreviewUrl || org?.coverImage ? (
          <Image
            src={coverPreviewUrl || org?.coverImage || ""}
            alt="Cover"
            fill
            className="object-cover rounded-xl"
          />
        ) : null}

        <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer group">
          <Input
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            onChange={handleCoverImageChange}
            className="hidden rounded-xl"
          />
          <div className="text-white text-center">
            <p className="text-sm">
              Cliquez pour modifier l'image de couverture
            </p>
            <p className="text-xs text-white/70">
              Format recommandé : 1920x400px
            </p>
          </div>
        </label>

        <div className="absolute -bottom-16 left-8">
          <div className="relative w-32 h-32">
            <div className="w-full h-full rounded-full shadow-lg">
              {previewUrl || org?.logo ? (
                <Image
                  src={previewUrl || org?.logo || ""}
                  alt="Logo"
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-full">
                  <p className="text-sm text-muted-foreground text-center px-4">
                    Ajoutez votre logo
                  </p>
                </div>
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full">
              <Input
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                onChange={handleImageChange}
                className="hidden rounded-full"
              />
              <p className="text-white text-xs">Modifier le logo</p>
            </label>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations principales</CardTitle>
                  <CardDescription>
                    Les informations essentielles de votre organisation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de l'organisation</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez le nom de l'organisation"
                              {...field}
                            />
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
                          <FormLabel>Adresse email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Entrez l'adresse email"
                              {...field}
                            />
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
                            placeholder="Décrivez votre organisation..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site web</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez l'adresse" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations légales</CardTitle>
                  <CardDescription>
                    Numéros d'identification de votre organisation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="siren"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro SIREN</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123456789"
                              maxLength={9}
                              {...field}
                            />
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
                          <FormLabel>Numéro SIRET</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="12345678900000"
                              maxLength={14}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Horaires d'ouverture</CardTitle>
                  <CardDescription>
                    Définissez vos heures d'ouverture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="openAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure d'ouverture</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="closeAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure de fermeture</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Services proposés</CardTitle>
                  <CardDescription>Personnalisez vos services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="atHome"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/50 transition-colors">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="text-sm font-medium leading-none">
                            Consultations à domicile
                          </FormLabel>
                          <FormDescription className="text-xs">
                            Activez cette option si vous proposez des
                            consultations à domicile
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nac"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nouveaux Animaux de Compagnie (NAC)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Listez les NAC acceptés"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Listez les types de NAC que vous acceptez (ex:
                          rongeurs, reptiles, oiseaux)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
