"use client";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useUploadThing } from "@/src/lib/uploadthing";
import { toast } from "sonner";
import { FileRoute } from "uploadthing/types";
import { EndpointArg } from "uploadthing/types";

export type AcceptedFileTypes = Record<string, Array<string>>;

interface DropzoneInputProps {
  onFilesChanged: (files: string[]) => void;
  value: string[];
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
        const newFiles = res.map((file) => file.url);
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

      {value && value.length > 0 && (
        <div className="grid gap-4">
          {value.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <span className="text-sm truncate max-w-[80%]">{file}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 