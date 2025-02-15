"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useUploadThing } from "@/src/lib/uploadthing";
import { toast } from "sonner";
import { Organization } from "@/src/db";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface ProfileCoverSectionProps {
  org: Organization;
}

export const ProfileCoverSection = ({ org }: ProfileCoverSectionProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(org?.logo || null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    org?.coverImage || null,
  );
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing("documentsUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
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
    <div className="relative w-full h-[200px] rounded-xl overflow-visible bg-gradient-to-r from-blue-50 to-blue-100">
      {coverPreviewUrl || org?.coverImage ? (
        <Image
          src={coverPreviewUrl || org?.coverImage || ""}
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
              disabled={isUploading}
            />
            <p className="text-white text-xs">Modifier le logo</p>
          </label>
        </div>
      </div>
    </div>
  );
}; 