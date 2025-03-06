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
import { ImageIcon, Loader2, PenBox, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/src/lib/uploadthing";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrganization } from "@/src/actions/organization.action";
import { proInformationsSchema } from "../../types/onboarding-schemas";
import { useMutation } from "@tanstack/react-query";

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
  const [logoUploadProgress, setLogoUploadProgress] = useState(0);
  const [logoIsUploading, setLogoIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof proInformationsSchema>>({
    resolver: zodResolver(proInformationsSchema),
    defaultValues: {
      name: "",
      email: "",
      logo: "",
      description: "",
      companyType: "OTHER",
      atHome: false,
    },
  });

  const { control, setValue, handleSubmit, reset, getValues } = form;

  console.log(getValues(), "values");

  const { mutateAsync } = useMutation({
    mutationFn: createOrganization,
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Entreprise créée avec succès!");
      nextStep();
      reset();
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error) => {
      toast.error(error.message);
      setIsLoading(false);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
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

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col h-full">
        <div className="flex-1 px-6 flex flex-col py-4">
          <div className="space-y-6 flex-1 flex flex-col">
            {/* En-tête avec Logo et Nom */}
            <div className="flex gap-4 items-end">
              {/* Logo Upload */}
              <div className="flex-shrink-0">
                <div className="mb-1.5">
                  <FormLabel className="text-sm font-medium">Logo</FormLabel>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    PNG, JPG (max 5MB)
                  </p>
                </div>
                <div className="w-[140px]">
                  {form.getValues("logo") === "" && !logoIsUploading ? (
                    <div
                      {...getLogoRootProps()}
                      className={cn(
                        "w-[140px] h-[140px] border border-dashed border-border hover:border-primary/50 rounded-lg transition-all bg-muted/30 hover:bg-muted/50",
                        isLogoDragActive && "border-primary bg-primary/5",
                        form.formState.errors.logo && "border-destructive",
                      )}
                    >
                      <input {...getLogoInputProps()} />
                      <div className="flex flex-col items-center justify-center h-full gap-1">
                        <ImageIcon
                          className={cn(
                            "h-5 w-5 text-muted-foreground",
                            form.formState.errors.logo && "text-destructive",
                          )}
                        />
                        <p className="text-xs text-muted-foreground text-center px-2">
                          Glissez ou cliquez
                        </p>
                      </div>
                    </div>
                  ) : logoIsUploading ? (
                    <div className="w-[140px] h-[140px] rounded-lg border flex items-center justify-center bg-muted/30">
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
                    <div className="group relative w-[140px] h-[140px] rounded-lg overflow-hidden border bg-muted/30">
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
              </div>

              {/* Informations principales */}
              <div className="flex-1 space-y-4">
                <div className="flex gap-4">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-medium">
                          Nom de votre entreprise
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="string"
                            placeholder="Biume Inc."
                            {...field}
                            value={field.value ?? ""}
                            className={cn(
                              "h-9",
                              form.formState.errors.name &&
                                "border-destructive",
                            )}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-medium">
                          Email de contact
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="contact@biume.com"
                            {...field}
                            value={field.value ?? ""}
                            className={cn(
                              "h-9",
                              form.formState.errors.email &&
                                "border-destructive",
                            )}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4 items-end">
                  <FormField
                    control={control}
                    name="companyType"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-medium">
                          Type d&apos;entreprise
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

                  <FormField
                    control={control}
                    name="atHome"
                    render={({ field }) => (
                      <FormItem className="flex-1 flex flex-row items-center justify-between rounded-lg border p-2.5 bg-muted/30">
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
                          "flex-1 min-h-[120px] resize-none text-base",
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
          </div>
        </div>

        {/* Footer with buttons */}
        <div className="flex justify-between items-center pt-4 lg:pt-8 p-4 lg:p-0 border-t">
          <Button
            disabled={isLoading}
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={previousStep}
          >
            ← Précédent
          </Button>
          <div className="flex gap-3">
            <Button
              disabled={isLoading}
              type="button"
              variant="ghost"
              onClick={nextStep}
              className="text-muted-foreground"
            >
              Passer
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              className="rounded-xl px-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>En cours...</span>
                </>
              ) : (
                "Suivant →"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default InformationsForm;
