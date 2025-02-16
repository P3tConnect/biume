"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useUploadThing } from "@/src/lib/uploadthing";
import { toast } from "sonner";
import { Organization } from "@/src/db";
import { ActionResult } from "@/src/lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentOrganization, updateOrganizationImages } from "@/src/actions/organization.action";
import { organizationImagesFormSchema } from "../../profile-section";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast";
import { useActionMutation, useActionQuery } from "@/src/hooks/action-hooks";
import { useQueryClient } from "@tanstack/react-query";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface ProfileCoverSectionProps {
  org: Promise<ActionResult<Organization | null>>;
}

export const ProfileCoverSection = ({ org }: ProfileCoverSectionProps) => {
  const dataOrg = use(org);

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    dataOrg?.data?.logo || null,
  );
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    dataOrg?.data?.coverImage || null,
  );
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof organizationImagesFormSchema>>({
    resolver: zodResolver(organizationImagesFormSchema),
    values: {
      logo: dataOrg?.data?.logo || "",
      coverImage: dataOrg?.data?.coverImage || "",
    },
  });

  const { handleSubmit } = form;

  const { mutateAsync: updateImages } = useActionMutation(updateOrganizationImages, {
    onSuccess: () => {
      toast.success("Images modifiées avec succès!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await updateImages(data);
  });

  useFormChangeToast({
    form,
    onSubmit,
    message: "Images en attente",
    description: "Pensez à sauvegarder vos changements",
    position: "bottom-center",
  });

  const { startUpload } = useUploadThing("documentsUploader", {
    onClientUploadComplete: async (res) => {
      if (res && res[0]) {
        const url = res[0].url;
        if (isUploading) {
          setPreviewUrl(url);
          toast.success("Logo téléchargé et modifié avec succès!");
        }
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
          const url = result[0].url;
          setCoverPreviewUrl(url);
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
    <Form {...form}>
      <div className="relative w-full h-[200px] rounded-xl overflow-visible bg-gradient-to-r from-blue-50 to-blue-100">
        {coverPreviewUrl || dataOrg?.data?.coverImage ? (
          <Image
            src={coverPreviewUrl || dataOrg?.data?.coverImage || ""}
            alt="Cover"
            fill
            className="object-cover rounded-xl"
          />
        ) : null}

        <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 rounded-xl transition-opacity cursor-pointer group">
          <Input
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            onChange={handleCoverImageChange}
            className="hidden rounded-xl"
            disabled={isUploading}
          />
          <div className="text-white text-center">
            <p className="text-sm">
              Cliquez pour modifier l&apos;image de couverture
            </p>
            <p className="text-xs text-white/70">
              Format recommandé : 1920x400px
            </p>
          </div>
        </label>

        <div className="absolute -bottom-16 left-8">
          <div className="relative w-32 h-32">
            <div className="w-full h-full rounded-full shadow-lg">
              {previewUrl || dataOrg?.data?.logo ? (
                <Image
                  src={previewUrl || dataOrg?.data?.logo || ""}
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
                disabled={isUploading}
              />
              <p className="text-white text-xs">Modifier le logo</p>
            </label>
          </div>
        </div>
      </div>
    </Form>
  );
}; 