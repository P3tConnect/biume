'use client';

import { UseFormReturn } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { ImageIcon, FileIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AttachmentsStepProps {
  form: UseFormReturn<any>
}

export function AttachmentsStep({ form }: AttachmentsStepProps) {
  const onPhotoDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentPhotos = form.getValues("photos") || []
      form.setValue("photos", [...currentPhotos, ...acceptedFiles])
    },
    [form]
  )

  const onDocumentDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentDocs = form.getValues("documents") || []
      form.setValue("documents", [...currentDocs, ...acceptedFiles])
    },
    [form]
  )

  const { getRootProps: getPhotoRootProps, getInputProps: getPhotoInputProps } =
    useDropzone({
      onDrop: onPhotoDrop,
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      },
    })

  const {
    getRootProps: getDocumentRootProps,
    getInputProps: getDocumentInputProps,
  } = useDropzone({
    onDrop: onDocumentDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
  })

  const removePhoto = (index: number) => {
    const currentPhotos = form.getValues("photos") || []
    form.setValue(
      "photos",
      currentPhotos.filter((_: any, i: number) => i !== index)
    )
  }

  const removeDocument = (index: number) => {
    const currentDocs = form.getValues("documents") || []
    form.setValue(
      "documents",
      currentDocs.filter((_: any, i: number) => i !== index)
    )
  }

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="photos"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Photos</FormLabel>
            <FormDescription>
              Ajoutez des photos liées à la prestation (formats acceptés : PNG, JPG, JPEG, GIF)
            </FormDescription>
            <FormControl>
              <div
                {...getPhotoRootProps()}
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary"
              >
                <input {...getPhotoInputProps()} />
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2">
                  Glissez-déposez des photos ici, ou cliquez pour sélectionner
                </p>
              </div>
            </FormControl>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {(field.value || []).map((file: File, index: number) => (
                <div
                  key={index}
                  className="relative bg-muted rounded-lg p-2 flex items-center"
                >
                  <ImageIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm truncate">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="documents"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Documents</FormLabel>
            <FormDescription>
              Ajoutez des documents complémentaires (formats acceptés : PDF, DOC, DOCX)
            </FormDescription>
            <FormControl>
              <div
                {...getDocumentRootProps()}
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary"
              >
                <input {...getDocumentInputProps()} />
                <FileIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2">
                  Glissez-déposez des documents ici, ou cliquez pour sélectionner
                </p>
              </div>
            </FormControl>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {(field.value || []).map((file: File, index: number) => (
                <div
                  key={index}
                  className="relative bg-muted rounded-lg p-2 flex items-center"
                >
                  <FileIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm truncate">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1"
                    onClick={() => removeDocument(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
} 