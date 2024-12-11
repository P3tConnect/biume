"use client";

import {
  Button,
  Input,
  FormField,
  FormItem,
  FormLabel,
  FormControl, SelectTrigger, SelectValue, SelectContent, SelectItem, Select, Form,
} from "@/components/ui";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useLocale} from "next-intl";
import {useStepper} from "../../hooks/useStepper";
import {useStore} from "@/src/hooks";
import {clientSchema} from "@/src/lib";
import {UploadDropzone} from "@uploadthing/react";
import Image from "next/image";
import {toast} from "sonner";
import {Loader2, PenBox, Trash2} from "lucide-react";


interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  initialImage?: string;
}

const ClientInformationForm = ({onImageUpload, initialImage = ''}: ImageUploaderProps) => {
  const locale = useLocale();
  const stepperStore = useStore(useStepper, (state) => state);

  const [profilImage, setProfilImage] = useState(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadComplete = (res: { url: string }[]) => {
    setIsUploading(false);
    const newImageUrl = res[0].url;
    setProfilImage(newImageUrl);
    onImageUpload(newImageUrl);
    toast.success("Image téléchargée avec succès!");
    console.log('Image téléchargée:', newImageUrl); // Pour le débogage
  };

  const handleImageDelete = () => {
    setProfilImage('');
    onImageUpload('');
    toast.success("Image de profil supprimée!");
    console.log('Image supprimée'); // Pour le débogage
  };

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      birthday: "",
      phoneNumber: "",
      sexe: "",
      address: "",
      city: "",
      zipCode: "",
      image: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="image"
            render={({field}) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <div className="w-full">
                    {field.value ? (
                      <div className="flex flex-col items-center gap-4">
                        <div
                          className="group relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20">
                          <Image
                            src={field.value}
                            alt="Profile"
                            fill
                            className="object-cover"
                          />
                          <div
                            className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <UploadDropzone
                              endpoint="imageUploader"
                              appearance={{
                                container: "w-full h-full absolute inset-0 border-none",
                                label: "w-full h-full flex items-center justify-center",
                                uploadIcon: "hidden",
                              }}
                              content={{
                                label() {
                                  return (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="rounded-full text-white hover:text-white"
                                    >
                                      <PenBox size={16}/>
                                    </Button>
                                  );
                                },
                                allowedContent: () => "",
                              }}
                              onClientUploadComplete={(res) => {
                                field.onChange(res[0].url);
                                toast.success("Profile image updated!");
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full text-white hover:text-white"
                              onClick={() => {
                                field.onChange("");
                                toast.success("Profile image removed!");
                              }}
                            >
                              <Trash2 size={16}/>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint="imageUploader"
                        appearance={{
                          container: "w-full h-32 border-2 border-dashed border-primary/20 rounded-full transition-all bg-background/50 hover:bg-primary/5",
                          label: "text-primary",
                          allowedContent: "text-xs text-muted-foreground text-center",
                          uploadIcon: "hidden",
                          button: "hidden",
                        }}
                        content={{
                          label({ready}) {
                            if (ready)
                              return (
                                <div className="flex flex-col items-center gap-2">
                                  <div className="p-2 rounded-full bg-primary/10">
                                    <PenBox className="h-6 w-6 text-primary"/>
                                  </div>
                                  <div className="space-y-1 text-center">
                                    <p className="text-xs font-medium text-primary">
                                      Upload Image
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      or drag and drop
                                    </p>
                                  </div>
                                </div>
                              );
                            return (
                              <div className="flex items-center justify-center">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/>
                              </div>
                            );
                          },
                          allowedContent({ready}) {
                            if (!ready) return "";
                            return "PNG, JPG • 4MB";
                          },
                        }}
                        onUploadBegin={() => {
                          setIsUploading(true);
                          toast.info("Uploading image...");
                        }}
                        onUploadProgress={(progress) => {
                          setUploadProgress(progress);
                        }}
                        onClientUploadComplete={(res) => {
                          setIsUploading(false);
                          field.onChange(res[0].url);
                          toast.success("Image uploaded successfully!");
                        }}
                        onUploadError={(error: Error) => {
                          setIsUploading(false);
                          toast.error(`Error: ${error.message}`);
                        }}
                      />
                    )}
                    {isUploading && (
                      <div className="w-32 mt-2 mx-auto">
                        <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300 rounded-full"
                            style={{width: `${uploadProgress}%`}}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="lastname"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="text"
                    placeholder="Nom"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="text"
                    placeholder="Prénom"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="birthday"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Date de naissance</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="date"
                    placeholder="Date de naissance"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sexe"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Date de naissance</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre sexe"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Masculin">Masculin</SelectItem>
                    <SelectItem value="Féminin">Féminin</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="tel"
                    placeholder="Téléphone"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Ville</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="text"
                    placeholder="Ville"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="address"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="text"
                    placeholder="Adresse (ex: 32 rue de la tour)"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel>Code postal</FormLabel>
                <FormControl>
                  <Input
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    type="number"
                    placeholder="Code postal (ex: 75001)"
                    required
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex items-end justify-end">
          <Button type="submit" variant="default">
            Étape suivante
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientInformationForm;
