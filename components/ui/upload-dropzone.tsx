"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadDropzoneProps {
  endpoint: string;
  onClientUploadComplete: (result: Array<{ url: string }>) => void;
  onUploadError: (error: { message: string }) => void;
}

export function UploadDropzone({ endpoint, onClientUploadComplete, onUploadError }: UploadDropzoneProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simuler un téléchargement réussi
    // Dans une implémentation réelle, vous utiliseriez un service comme uploadthing
    try {
      // Simuler un délai de téléchargement
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Créer une URL de données pour l'image
      const reader = new FileReader();
      reader.onload = () => {
        onClientUploadComplete([{ url: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      onUploadError({ message: "Erreur lors du téléchargement" });
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
      <Upload className="h-10 w-10 text-gray-400 mb-2" />
      <p className="text-sm text-gray-500 mb-4">Glissez-déposez ou cliquez pour télécharger</p>
      <input
        type="file"
        className="hidden"
        id="file-upload"
        onChange={handleFileChange}
        accept="image/*"
      />
      <label htmlFor="file-upload">
        <Button type="button" variant="outline">
          Sélectionner un fichier
        </Button>
      </label>
    </div>
  );
} 