"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUploadThing } from "@/src/lib/uploadthing";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { cn } from "@/src/lib/utils";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { organization } from "@/src/lib/auth-client";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface ImagesFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function ImagesForm({ onSuccess, onBack }: ImagesFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { startUpload } = useUploadThing("documentsUploader", {
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const uploadedImages = await startUpload(acceptedFiles);
      if (uploadedImages) {
        const imageUrls = uploadedImages.map((img) => img.url);
        setImages((prev) => [...prev, ...imageUrls]);
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors du téléchargement des images.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [startUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 5,
  });

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      await organization.update({
        data: {
          metadata: {
            images,
          },
        },
      });
      onSuccess();
    } catch (error) {
      toast.error("Une erreur est survenue lors de la sauvegarde des images.");
    }
  };

  return (
    <div className="space-y-6">
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
            <p className="text-sm text-muted-foreground">
              PNG, JPG, JPEG ou WEBP (max 5 images)
            </p>
          </div>
        )}
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
                src={image}
                alt={`Image ${index + 1}`}
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-48"
              />
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={handleSubmit} disabled={isUploading}>
          Continuer
        </Button>
      </div>
    </div>
  );
}
