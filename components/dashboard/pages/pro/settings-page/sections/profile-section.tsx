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

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const organizationFormSchema = z.object({
  name: z.string().min(2, "Le nom de l'organisation doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  website: z.string().url().optional(),
  address: z.string().min(5, "Veuillez entrer une adresse valide"),
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
});

export const ProfileSection = () => {
  const { data: org } = useActiveOrganization();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      name: org?.name || "",
      email: org?.metadata?.email || "",
      website: org?.metadata?.website || "",
      address: org?.metadata?.address || "",
    },
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

  const onSubmit = async (data: z.infer<typeof organizationFormSchema>) => {
    if (!organization) return;

    try {
      await organization.update({
        data: {
          name: data.name ?? "",
          logo: previewUrl || org?.logo || "",
        }
      });
      toast.success("Organisation mise à jour avec succès");
      router.refresh();
    } catch (error) {
      console.error("Error updating organization:", error);
      toast.error("Erreur lors de la mise à jour de l'organisation");
    }
  };

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site web</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Le site web public de votre organisation
                  </FormDescription>
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
            <Button type="submit">Enregistrer les modifications</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}; 