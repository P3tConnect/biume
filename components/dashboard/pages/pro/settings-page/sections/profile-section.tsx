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
import { Button } from "@/components/ui/button";
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
import { useActiveOrganization, organization } from "@/src/lib/auth-client";
import Image from "next/image";
import { useUploadThing } from "@/src/lib/uploadthing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateOrganization } from "@/src/actions/organization.action";
import { CreateOrganizationSchema } from "@/src/db/organization";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const organizationFormSchema = z.object({
  name: z.string().min(2, "Le nom de l'organisation doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  website: z.string().url().optional(),
  address: z.string().min(5, "Veuillez entrer une adresse valide"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  logo: z
    .any()
    .refine((file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), {
      message: "Le fichier doit faire moins de 5MB",
    })
    .refine(
      (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      {
        message: "Format accepté : .jpg, .jpeg, .png et .webp",
      }
    )
    .optional(),
  coverImage: z
    .any()
    .refine((file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), {
      message: "Le fichier doit faire moins de 5MB",
    })
    .refine(
      (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      {
        message: "Format accepté : .jpg, .jpeg, .png et .webp",
      }
    )
    .optional(),
  openAt: z.string(),
  closeAt: z.string(),
  atHome: z.boolean(),
  nac: z.object({
    enabled: z.boolean(),
    animals: z.array(z.string()).optional(),
  }),
  siren: z.string().length(9, "Le numéro SIREN doit contenir 9 chiffres"),
  siret: z.string().length(14, "Le numéro SIRET doit contenir 14 chiffres"),
});

export const ProfileSection = () => {
  const { data: org } = useActiveOrganization();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      name: org?.name || "",
      email: org?.metadata?.email || "",
      website: org?.metadata?.website || "",
      address: org?.metadata?.address || "",
      description: org?.metadata?.description || "",
      openAt: org?.metadata?.openAt || "09:00",
      closeAt: org?.metadata?.closeAt || "18:00",
      atHome: org?.metadata?.atHome || false,
      nac: org?.metadata?.nac || { enabled: false, animals: [] },
      siren: org?.metadata?.siren || "",
      siret: org?.metadata?.siret || "",
    },
  });

  const { handleSubmit } = form;

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

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onSubmit = handleSubmit(async (data) => { });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil de l'organisation</CardTitle>
        <CardDescription>
          Mettez à jour les informations de base de votre organisation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="logo"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Logo de l'organisation</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          {(previewUrl || org?.logo) && (
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                              <Image
                                src={previewUrl || org?.logo || ""}
                                alt="Logo preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <Input
                              type="file"
                              accept={ACCEPTED_IMAGE_TYPES.join(",")}
                              onChange={handleImageChange}
                              {...field}
                            />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Formats acceptés : JPG, PNG, WebP. Taille maximale : 5MB
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverImage"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Image de couverture</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          {(coverPreviewUrl || org?.metadata?.coverImage) && (
                            <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                              <Image
                                src={coverPreviewUrl || org?.metadata?.coverImage || ""}
                                alt="Cover preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <Input
                              type="file"
                              accept={ACCEPTED_IMAGE_TYPES.join(",")}
                              onChange={handleCoverImageChange}
                              {...field}
                            />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Image de couverture de votre organisation. Formats acceptés : JPG, PNG, WebP. Taille maximale : 5MB
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'organisation</FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez le nom de l'organisation" {...field} />
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
                        <Input placeholder="Entrez l'adresse email" {...field} />
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
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site web</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
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
                        <Input placeholder="Entrez l'adresse de l'organisation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="openAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heure d'ouverture</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                        />
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
                        <Input
                          type="time"
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
                name="atHome"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Consultations à domicile</FormLabel>
                      <FormDescription>
                        Activez cette option si vous proposez des consultations à domicile
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nac.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Nouveaux Animaux de Compagnie (NAC)</FormLabel>
                      <FormDescription>
                        Activez cette option si vous acceptez les NAC
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
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
            </div>

            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Téléchargement..." : "Enregistrer les modifications"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}; 