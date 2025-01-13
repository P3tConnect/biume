"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Textarea,
} from "@/components/ui";
import { ImageIcon, PenBox, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useStepper } from "../../hooks/useStepper";
import Image from "next/image";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/src/lib/uploadthing";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { organization } from "@/src/lib/auth-client";
import { useServerActionMutation } from "@/src/hooks";
import { createOrganization } from "@/src/actions/organization.action";
import { onboardingSchema } from "../stepper";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

export const informationsSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom de votre entreprise doit contenir au moins un caractère"),
  description: z
    .string()
    .min(
      1,
      "La description de votre entreprise doit contenir au moins un caractère",
    ),
  logo: z.string().url(),
  coverImage: z.string().url(),
});

const InformationsForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}) => {
  const [uploadCoverProgress, setUploadCoverProgress] = useState(0);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [logoIsUploading, setLogoIsUploading] = useState(false);
  const stepper = useStepper();

  const { mutateAsync } = useServerActionMutation(createOrganization, {
    onSuccess: () => {
      toast.success("Organization created successfully");
    },
    onError: () => {
      toast.error("Error creating organization");
    },
    onMutate: () => {
      toast.loading("Creating organization...");
    },
  });

  const { startUpload: startLogoUpload } = useUploadThing("documentsUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        form.setValue("logo", res[0].url);
        toast.success("Logo téléchargé avec succès!");
      }
    },
    onUploadProgress(p) {
      setLogoUploadProgress(p);
    },
    onUploadError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const { startUpload: startCoverUpload } = useUploadThing(
    "documentsUploader",
    {
      onClientUploadComplete: (res) => {
        if (res && res[0]) {
          form.setValue("coverImage", res[0].url);
          toast.success("Image de couverture téléchargée avec succès!");
        }
      },
      onUploadError: (error) => {
        toast.error(`Erreur: ${error.message}`);
      },
    },
  );

  const {
    getRootProps: getLogoRootProps,
    getInputProps: getLogoInputProps,
    isDragActive: isLogoDragActive,
  } = useDropzone({
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setLogoIsUploading(true);
        toast.info("Téléchargement du logo en cours...");
        await startLogoUpload(acceptedFiles);
        setLogoIsUploading(false);
      }
    },
  });

  const {
    getRootProps: getCoverRootProps,
    getInputProps: getCoverInputProps,
    isDragActive: isCoverDragActive,
  } = useDropzone({
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setIsUploadingCover(true);
        toast.info("Téléchargement de l'image de couverture en cours...");
        await startCoverUpload(acceptedFiles);
        setIsUploadingCover(false);
      }
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex flex-row gap-6">
          {/* Logo Upload Section */}
          <div className="flex flex-col items-start gap-4 w-1/4">
            <p className="text-sm font-semibold">Logo de votre entreprise</p>
            {form.getValues("logo") == "" ? (
              <div className="w-full">
                <div
                  {...getLogoRootProps()}
                  className={cn(
                    "w-full h-full border-2 border-dashed border-primary/20 rounded-2xl transition-all bg-background/50 hover:bg-primary/5",
                    isLogoDragActive && "border-primary bg-primary/5",
                  )}
                >
                  <input {...getLogoInputProps()} />
                  <div className="flex flex-col items-center gap-2 p-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <ImageIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-xs font-medium text-primary">
                        Glissez-déposez
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ou cliquez
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG • 5MB
                      </p>
                    </div>
                  </div>
                </div>
                {logoIsUploading && (
                  <div className="w-32 mt-2">
                    <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300 rounded-full"
                        style={{ width: `${logoUploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="group relative w-32 h-30 rounded-2xl overflow-hidden border-2 border-primary/20">
                  <Image
                    src={form.getValues("logo") ?? ""}
                    alt="logo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      {...getLogoRootProps()}
                      className="w-full h-full absolute inset-0"
                    >
                      <input {...getLogoInputProps()} />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-white hover:text-white"
                      >
                        <PenBox size={16} />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-white hover:text-white"
                      onClick={() => {
                        form.setValue("logo", "");
                        setLogoIsUploading(false);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cover Image Upload Section */}
          <div className="flex flex-col items-start gap-4 w-3/4">
            <p className="text-sm font-semibold">Image de couverture</p>
            {form.getValues("coverImage") == "" ? (
              <div
                {...getCoverRootProps()}
                className={cn(
                  "w-full h-full border-2 border-dashed border-primary/20 rounded-2xl transition-all bg-background/50 hover:bg-primary/5",
                  isCoverDragActive && "border-primary bg-primary/5",
                )}
              >
                <input {...getCoverInputProps()} />
                <div className="flex flex-col items-center gap-2 p-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ImageIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-xs font-medium text-primary">
                      Glissez-déposez
                    </p>
                    <p className="text-xs text-muted-foreground">ou cliquez</p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG • 5MB
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-primary/20">
                <Image
                  src={form.getValues("coverImage") ?? ""}
                  alt="cover"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <div {...getCoverRootProps()} className="w-auto h-auto">
                    <input {...getCoverInputProps()} />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-xl"
                    >
                      <PenBox size={16} />
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-xl"
                    onClick={() => form.setValue("coverImage", "")}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Nom de votre entreprise
                </FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    placeholder="PawThera Inc."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Description de votre entreprise
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-card"
                    placeholder="Description de votre entreprise"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default InformationsForm;
