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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { ImageIcon, PenBox, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/src/lib/uploadthing";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { proInformationsSchema } from "../../types/onboarding-schemas";
import { useActionMutation } from "@/src/hooks/action-hooks";
import { createOrganization } from "@/src/actions/organization.action";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

const InformationsForm = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const [uploadCoverProgress, setUploadCoverProgress] = useState(0);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [logoIsUploading, setLogoIsUploading] = useState(false);

  const form = useForm<z.infer<typeof proInformationsSchema>>({
    resolver: zodResolver(proInformationsSchema),
    defaultValues: {
      name: "",
      atHome: false,
      companyType: "NONE",
      coverImage: "",
      description: "",
      logo: "",
    },
  });

  const { control, setValue, handleSubmit, reset } = form;

  const { mutateAsync } = useActionMutation(createOrganization, {
    onSuccess: () => {
      toast.success("Entreprise créée avec succès!");
      nextStep();
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { startUpload: startLogoUpload } = useUploadThing("documentsUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        setValue("logo", res[0].url);
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

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  const { startUpload: startCoverUpload } = useUploadThing(
    "documentsUploader",
    {
      onClientUploadComplete: (res) => {
        if (res && res[0]) {
          setValue("coverImage", res[0].url);
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
      <form onSubmit={onSubmit} className="flex flex-col h-full">
        <div className="flex-1 px-6 flex flex-col py-4">
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Images Upload */}
            <div className="grid grid-cols-2 gap-4" style={{ height: "260px" }}>
              {/* Logo Upload */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <FormLabel className="text-sm font-medium">Logo</FormLabel>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG (max 5MB)
                  </p>
                </div>
                {form.getValues("logo") === "" && !logoIsUploading ? (
                  <div
                    {...getLogoRootProps()}
                    className={cn(
                      "w-full h-[220px] border border-dashed border-border hover:border-primary/50 rounded-lg transition-all bg-muted/30 hover:bg-muted/50",
                      isLogoDragActive && "border-primary bg-primary/5",
                      form.formState.errors.logo && "border-destructive",
                    )}
                  >
                    <input {...getLogoInputProps()} />
                    <div className="flex flex-col items-center justify-center h-full gap-1">
                      <ImageIcon
                        className={cn(
                          "h-4 w-4 text-muted-foreground",
                          form.formState.errors.logo && "text-destructive",
                        )}
                      />
                      <p className="text-xs text-muted-foreground">
                        Glissez ou cliquez
                      </p>
                    </div>
                  </div>
                ) : logoIsUploading ? (
                  <div className="w-full h-[220px] rounded-lg border flex items-center justify-center bg-muted/30">
                    <div className="w-8 h-8 relative">
                      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300 rounded-full"
                          style={{ width: `${logoUploadProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="group relative w-full h-[220px] rounded-lg overflow-hidden border bg-muted/30">
                    <Image
                      src={form.getValues("logo") ?? ""}
                      alt="logo"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div
                        {...getLogoRootProps()}
                        className="w-full h-full absolute inset-0"
                      >
                        <input {...getLogoInputProps()} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-white hover:text-white"
                        >
                          <PenBox size={12} />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white hover:text-white"
                        onClick={() => {
                          form.setValue("logo", "");
                          setLogoIsUploading(false);
                        }}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cover Image Upload */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <FormLabel className="text-sm font-medium">
                    Image de couverture
                  </FormLabel>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG (max 5MB)
                  </p>
                </div>
                {form.getValues("coverImage") == "" ? (
                  <div
                    {...getCoverRootProps()}
                    className={cn(
                      "w-full h-[220px] border border-dashed border-border hover:border-primary/50 rounded-lg transition-all bg-muted/30 hover:bg-muted/50",
                      isCoverDragActive && "border-primary bg-primary/5",
                      form.formState.errors.coverImage && "border-destructive",
                    )}
                  >
                    <input {...getCoverInputProps()} />
                    <div className="flex flex-col items-center justify-center h-full gap-1">
                      <ImageIcon
                        className={cn(
                          "h-4 w-4 text-muted-foreground",
                          form.formState.errors.coverImage &&
                            "text-destructive",
                        )}
                      />
                      <p className="text-xs text-muted-foreground">
                        Glissez ou cliquez
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-[220px] rounded-lg overflow-hidden border bg-muted/30">
                    <Image
                      src={form.getValues("coverImage") ?? ""}
                      alt="cover"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1">
                      <div {...getCoverRootProps()} className="w-auto h-auto">
                        <input {...getCoverInputProps()} />
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-6 w-6"
                        >
                          <PenBox size={12} />
                        </Button>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => form.setValue("coverImage", "")}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Nom et Type */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Nom de votre entreprise
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="string"
                        placeholder="PawThera Inc."
                        {...field}
                        value={field.value ?? ""}
                        className={cn(
                          "h-9",
                          form.formState.errors.name && "border-destructive",
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="companyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Type d'entreprise
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? "NONE"}
                    >
                      <FormControl>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AUTO-ENTREPRENEUR">
                          Auto-entrepreneur
                        </SelectItem>
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
            </div>

            {/* Description */}
            <div className="flex-1 flex flex-col">
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
                    <FormLabel className="text-sm font-medium">
                      Description de votre entreprise
                    </FormLabel>
                    <FormControl className="flex-1">
                      <Textarea
                        className={cn(
                          "flex-1 min-h-[32px] resize-none text-base",
                          form.formState.errors.description &&
                            "border-destructive",
                        )}
                        placeholder="Décrivez votre activité, vos services et ce qui vous rend unique..."
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Switch */}
            <FormField
              control={control}
              name="atHome"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2.5 bg-muted/30">
                  <div>
                    <FormLabel className="text-sm font-medium">
                      Prestations à domicile
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Proposez-vous des prestations à domicile ?
                    </p>
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
        </div>

        {/* Footer with buttons */}
        <div className="flex justify-end gap-3 py-3 px-6 border-t">
          <Button variant="outline" onClick={previousStep} className="h-9">
            Précédent
          </Button>
          <Button type="submit" variant="default" className="h-9">
            Suivant
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InformationsForm;
