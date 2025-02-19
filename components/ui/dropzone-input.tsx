"use client";

import { useDropzone } from "react-dropzone";
import { cn } from "@/src/lib/utils";
import { useUploadThing } from "@/src/lib/uploadthing";
import { toast } from "sonner";

export type AcceptedFileTypes = Record<string, Array<string>>;

interface DropzoneInputProps {
  onFilesChanged: (files: Array<{ url: string; name: string }>) => void;
  value: Array<{ url: string; name: string }>;
  maxFileSize?: number;
  acceptedFileTypes?: AcceptedFileTypes;
  uploadEndpoint: "documentsUploader" | "imageUploader";
  placeholder?: {
    dragActive?: string;
    dragInactive?: string;
    fileTypes?: string;
  };
}

export const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const DEFAULT_ACCEPTED_IMAGE_TYPES: AcceptedFileTypes = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

export const DEFAULT_ACCEPTED_DOCUMENT_TYPES: AcceptedFileTypes = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

export const DropzoneInput = ({
  onFilesChanged,
  value,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  acceptedFileTypes = DEFAULT_ACCEPTED_DOCUMENT_TYPES,
  uploadEndpoint = "documentsUploader",
  placeholder = {
    dragActive: "Déposez vos fichiers ici",
    dragInactive: "Glissez-déposez vos fichiers ici, ou cliquez pour sélectionner",
    fileTypes: "PDF, JPEG, PNG - 5MB max",
  },
}: DropzoneInputProps) => {
  const { startUpload } = useUploadThing(uploadEndpoint as "documentsUploader", {
    onClientUploadComplete: (res) => {
      if (res) {
        const newFiles = res.map((file) => ({
          url: file.url,
          name: file.name
        }));
        onFilesChanged([...value, ...newFiles]);
        toast.success("Fichiers téléchargés avec succès!");
      }
    },
    onUploadError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedFileTypes,
    maxSize: maxFileSize,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        await startUpload(acceptedFiles);
      }
    },
  });

  const removeFile = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onFilesChanged(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-200 hover:border-primary/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isDragActive ? placeholder.dragActive : placeholder.dragInactive}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {placeholder.fileTypes}
          </p>
        </div>
      </div>
    </div>
  );
}; 