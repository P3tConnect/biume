"use client";

import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateUserSchema } from "@/src/db";
import { UploadDropzone } from "@/src/lib/uploadthing";
import { ImageIcon, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { updateUser } from "@/src/actions/user.action";

const ClientInformationForm = () => {
  const [profileImage, setProfileImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      image: "",
      address: "",
      city: "",
      country: "",
      zipCode: "",
      phoneNumber: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const userData = await updateUser(data);
      console.log("User created:", userData);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex flex-col items-start gap-4">
          <p className="text-sm font-semibold">Photo de profil</p>
          {profileImage === "" ? (
            <div className="w-full">
              <UploadDropzone
                endpoint="imageUploader"
                appearance={{
                  container:
                    "w-full h-full border-2 border-dashed border-primary/20 rounded-2xl transition-all bg-background/50 hover:bg-primary/5",
                  label: "text-primary",
                  allowedContent: "text-xs text-muted-foreground text-center",
                  uploadIcon: "hidden",
                  button: "hidden",
                }}
                content={{
                  label({ ready }) {
                    if (ready) {
                      return (
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <ImageIcon className="h-6 w-6 text-primary" />
                          </div>
                          <p className="text-xs font-medium text-primary">
                            Glissez-déposez ou cliquez
                          </p>
                        </div>
                      );
                    }
                    return (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    );
                  },
                  allowedContent: () => "PNG, JPG, JEPG • 4MB",
                }}
                onUploadBegin={() => {
                  setIsUploading(true);
                }}
                onUploadProgress={(progress) => {
                  setUploadProgress(progress);
                }}
                onClientUploadComplete={(res) => {
                  setIsUploading(false);
                  setProfileImage(res[0].url);
                  form.setValue("image", res[0].url);
                }}
                onUploadError={(error) => {
                  setIsUploading(false);
                  console.error(error.message);
                }}
              />
              {isUploading && (
                <div className="w-32 mt-2">
                  <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="group relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/20">
              <Image
                src={profileImage}
                alt="profile"
                className="object-cover w-full h-full"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-xl text-white hover:text-white"
                  onClick={() => setProfileImage("")}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-row gap-6">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel className="text-sm font-semibold">Pays</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Pays"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel className="text-sm font-semibold">Ville</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ville"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-3/4">
                <FormLabel className="text-sm font-semibold">Adresse</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Numéro de la rue et le nom de la rue"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="w-1/4">
                <FormLabel className="text-sm font-semibold">
                  Code Postal
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Code postal"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-6">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-semibold">
                  Numéro de téléphone
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="0607020403"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <Button type="submit" variant="default">
            Étape suivante
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientInformationForm;
