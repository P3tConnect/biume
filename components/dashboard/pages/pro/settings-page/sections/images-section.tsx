"use client";

import React, { useCallback, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropzoneInput,
  DEFAULT_ACCEPTED_IMAGE_TYPES,
} from "@/components/ui/dropzone-input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  addImagesToOrganization,
  deleteOrganizationImage,
  getOrganizationImages,
} from "@/src/actions/organization.action";
import { toast } from "sonner";
import { useActionMutation, useActionQuery } from "@/src/hooks/action-hooks";
import { useUploadThing } from "@/src/lib/uploadthing";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const ImagesSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { startUpload } = useUploadThing("documentsUploader", {
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const {
    data: imagesData,
    isLoading,
    refetch,
  } = useActionQuery(getOrganizationImages, {}, "images");

  const { mutateAsync: addImages } = useActionMutation(
    addImagesToOrganization,
    {
      onSuccess: () => {
        toast.success("Images ajoutées avec succès");
        refetch();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const { mutateAsync: deleteImage } = useActionMutation(
    deleteOrganizationImage,
    {
      onSuccess: () => {
        toast.success("Image supprimée avec succès");
        refetch();
      },
      onError: () => {
        toast.error("Erreur lors de la suppression de l'image");
      },
    },
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      setUploadProgress(0);
      try {
        const uploadedImages = await startUpload(acceptedFiles);
        if (uploadedImages) {
          const imageUrls = uploadedImages.map((img) => ({
            name: img.name,
            url: img.url,
          }));
          await addImages({ images: imageUrls });
        }
      } catch (error) {
        toast.error(
          "Une erreur est survenue lors du téléchargement des images.",
        );
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [startUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 5,
  });

  const handleDeleteImage = async (imageUrl: string) => {
    await deleteImage({ imageUrl });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
          <CardDescription>Chargement des images...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed rounded-lg p-8 text-center border-muted-foreground/20">
            <div className="flex flex-col items-center space-y-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="relative aspect-square w-64 h-64">
                <Skeleton className="w-full h-full rounded-xl" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
        <CardDescription>
          Gérez vos images professionnelles. Ces images seront visibles sur
          votre profil public.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/20",
          )}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Téléchargement en cours...</p>
              <div className="w-full max-w-xs space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  {Math.round(uploadProgress)}%
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
              <p>Glissez-déposez vos images ici ou cliquez pour sélectionner</p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG, JPEG ou WEBP (max 5 images)
              </p>
            </div>
          )}
        </div>

        {imagesData!.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {imagesData!.map((image, index) => (
              <div
                key={index}
                className="relative group aspect-square w-64 h-64"
              >
                <Image
                  src={image.url ?? ""}
                  alt={image.name ?? ""}
                  fill
                  className="object-cover rounded-xl shadow-sm"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  onClick={() => handleDeleteImage(image.url ?? "")}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImagesSection;
