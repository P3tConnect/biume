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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/components/ui";
import { ImageIcon, PenBox, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useStepper } from "../../hooks/useStepper";
import Image from "next/image";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/src/lib/uploadthing";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerActionMutation } from "@/src/hooks";
import { createOrganization } from "@/src/actions/organization.action";
import { proInformationsSchema } from "../../types/onboarding-schemas";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

const InformationsForm = () => {
  const [uploadCoverProgress, setUploadCoverProgress] = useState(0);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [logoIsUploading, setLogoIsUploading] = useState(false);
  const stepper = useStepper();

  const form = useForm<z.infer<typeof proInformationsSchema>>({
    resolver: zodResolver(proInformationsSchema),
    defaultValues: {
      name: "",
      logo: "",
      coverImage: "",
      description: "",
      companyType: "NONE",
      atHome: false,
    },
  });

  const { handleSubmit, control, reset } = form;

  const { mutateAsync } = useServerActionMutation(createOrganization, {
    onSuccess: () => {
      reset();
      stepper.next();
    },
    onError: () => {
      toast.error("Erreur lors de la création de l'organisation");
    },
    onMutate: () => {
      toast.loading("Création de l'organisation...");
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  const { startUpload: startLogoUpload } = useUploadThing("documentsUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        form.setValue("logo", res[0].url);
        toast.success("Logo téléchargé avec succès!");
        setLogoIsUploading(false);
      }
    },
    onUploadProgress(p) {
      setLogoUploadProgress(p);
    },
    onUploadError: (error) => {
      toast.error(`Erreur: ${error.message}`);
      setLogoIsUploading(false);
    },
  });

  const { startUpload: startCoverUpload } = useUploadThing(
    "documentsUploader",
    {
      onClientUploadComplete: (res) => {
        if (res && res[0]) {
          form.setValue("coverImage", res[0].url);
          toast.success("Image de couverture téléchargée avec succès!");
          setIsUploadingCover(false);
        }
      },
      onUploadProgress(p) {
        setUploadCoverProgress(p);
      },
      onUploadError: (error) => {
        toast.error(`Erreur: ${error.message}`);
        setIsUploadingCover(false);
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
                    form.formState.errors.logo && "border-destructive",
                  )}
                >
                  <input {...getLogoInputProps()} />
                  <div className="flex flex-col items-center gap-2 p-6">
                    <div className={cn("p-2 rounded-lg bg-primary/10", form.formState.errors.logo && "bg-destructive/10")}>
                      <ImageIcon className={cn("h-6 w-6 text-primary", form.formState.errors.logo && "text-destructive")} />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className={cn("text-xs font-medium text-primary", form.formState.errors.logo && "text-destructive")}>
                        Glissez-déposez
                      </p>
                      <p className={cn("text-xs text-muted-foreground", form.formState.errors.logo && "text-destructive")}>
                        ou cliquez
                      </p>
                      <p className={cn("text-xs text-muted-foreground", form.formState.errors.logo && "text-destructive")}>
                        PNG, JPG • 5MB
                      </p>
                    </div>
                  </div>
                </div>
                {form.formState.errors.logo && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.logo.message}
                  </p>
                )}
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
              <div className="w-full">
                <div
                  {...getCoverRootProps()}
                  className={cn(
                    "w-full h-full border-2 border-dashed border-primary/20 rounded-2xl transition-all bg-background/50 hover:bg-primary/5",
                    isCoverDragActive && "border-primary bg-primary/5",
                    form.formState.errors.coverImage && "border-destructive",
                  )}
                >
                  <input {...getCoverInputProps()} />
                  <div className="flex flex-col items-center gap-2 p-6">
                    <div className={cn("p-2 rounded-lg bg-primary/10", form.formState.errors.coverImage && "bg-destructive/10")}>
                      <ImageIcon className={cn("h-6 w-6 text-primary", form.formState.errors.coverImage && "text-destructive")} />
                    </div>
                    <div className="space-y-1 text-center">
                      <p className={cn("text-xs font-medium text-primary", form.formState.errors.coverImage && "text-destructive")}>
                        Glissez-déposez
                      </p>
                      <p className={cn("text-xs text-muted-foreground", form.formState.errors.coverImage && "text-destructive")}>ou cliquez</p>
                      <p className={cn("text-xs text-muted-foreground", form.formState.errors.coverImage && "text-destructive")}>
                        PNG, JPG • 5MB
                      </p>
                    </div>
                  </div>
                </div>
                {form.formState.errors.coverImage && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.coverImage.message}
                  </p>
                )}
                {isUploadingCover && (
                  <div className="w-32 mt-2">
                    <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300 rounded-full"
                        style={{ width: `${uploadCoverProgress}%` }}
                      />
                    </div>
                  </div>
                )}
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
            control={control}
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
                    className={cn(form.formState.errors.name && "border-2 border-destructive")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Description de votre entreprise
                </FormLabel>
                <FormControl>
                  <Textarea
                    className={cn("bg-card", form.formState.errors.description && "border-2 border-destructive")}
                    placeholder="Description de votre entreprise"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={control}
            name="companyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type d'entreprise</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre type d'entreprise" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AUTO-ENTREPRENEUR">Auto-entrepreneur</SelectItem>
                    <SelectItem value="SARL">SARL</SelectItem>
                    <SelectItem value="SAS">SAS</SelectItem>
                    <SelectItem value="EIRL">EIRL</SelectItem>
                    <SelectItem value="SASU">SASU</SelectItem>
                    <SelectItem value="EURL">EURL</SelectItem>
                    <SelectItem value="OTHER">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="atHome"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Prestations à domicile</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Proposez-vous des prestations à domicile ?
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" className="rounded-xl" onClick={stepper.prev}>
            Précédent
          </Button>
          <Button className="rounded-xl" type="submit" variant="default">Suivant</Button>
        </div>
      </form>
    </Form>
  );
};

export default InformationsForm;
