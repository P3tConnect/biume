"use client";

import {
  Button,
  Form,
  Input,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocale } from "next-intl";
import { useRouter } from "next/router";
import { useStepper } from "../../hooks/useStepper";
import { useStore } from "@/src/hooks";
import { UploadDropzone } from "@/src/lib/uploadthing";
import { ImageIcon, Loader2, PenBox, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { clientSchema } from "@/src/lib";
import { format } from "date-fns";
import parseDate from "postgres-date";

const ClientInformationForm = () => {
  const locale = useLocale();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [profilImage, setProfilImage] = useState("");
  const stepperStore = useStore(useStepper, (state) => state);
  const router = useRouter();

   const form = useForm<z.infer<typeof clientSchema>>({
     resolver: zodResolver(clientSchema),
     defaultValues: {
       address: "",
       birthday: new Date(),
       city: "",
       firstname: "",
       imageProfile: "",
       lastname: "",
       phoneNumber: "",
       zipCode: "",
     },
   });

   const onSubmit = form.handleSubmit((data) => {
     console.log(data);
   });

  return (
     <Form {...form}>
       <form onSubmit={onSubmit} className="space-y-4">
         <div className="flex flex-col items-start gap-4 w-1/4">
           <p className="text-sm font-semibold">Image de profil</p>
           {profilImage === "" ? (
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
                     if (ready)
                       return (
                         <div className="flex flex-col items-center gap-2">
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
                           </div>
                         </div>
                       );
                     return (
                       <div className="flex items-center justify-center">
                         <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                       </div>
                     );
                   },
                   allowedContent({ ready }) {
                     if (!ready) return "";
                     return "PNG, JPG • 4MB";
                   },
                 }}
                 onUploadBegin={() => {
                   setIsUploading(true);
                   toast.info("Téléchargement de l'image en cours...");
                 }}
                 onUploadProgress={(progress) => {
                   setUploadProgress(progress);
                 }}
                 onClientUploadComplete={(res) => {
                   setIsUploading(false);
                   setProfilImage(res[0].url);
                   form.setValue("imageProfile", res[0].url);
                   toast.success("Image téléchargé avec succès!");
                 }}
                 onUploadError={(error) => {
                   setIsUploading(false);
                   toast.error(`Erreur: ${error.message}`);
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
             <div className="flex flex-col items-center gap-4">
               <div className="group relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/20">
                 <Image
                   src={profilImage}
                   alt="profilImage"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
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
                             className="rounded-xl text-white hover:text-white"
                           >
                             <PenBox size={16} />
                           </Button>
                         );
                       },
                       allowedContent: () => "",
                     }}
                     onClientUploadComplete={(res) => {
                       setProfilImage(res[0].url);
                       form.setValue("imageProfile", res[0].url);
                       toast.success(
                         "L'image de profil à bien été mis à jour !"
                       );
                     }}
                   />
                   <Button
                     variant="ghost"
                     size="icon"
                     className="rounded-xl text-white hover:text-white"
                   >
                     <Trash2 size={16} />
                   </Button>
                 </div>
               </div>
             </div>
           )}
         </div>

         <div className="flex flex-row gap-4">
           <FormField
             control={form.control}
             name="lastname"
             render={({ field }) => (
               <FormItem className="flex-1">
                 <FormLabel>Nom</FormLabel>
                 <FormControl>
                   <Input {...field} type="text" placeholder="Nom" required />
                 </FormControl>
               </FormItem>
             )}
           />
           <FormField
             control={form.control}
             name="firstname"
             render={({ field }) => (
               <FormItem className="flex-1">
                 <FormLabel>Prénom</FormLabel>
                 <FormControl>
                   <Input {...field} type="text" placeholder="Prénom" required />
                 </FormControl>
               </FormItem>
             )}
           />
         </div>

         <div className="flex flex-row gap-4">
           <FormField
               control={form.control}
               name="birthday"
               render={({ field }) => (
                   <FormItem className="flex-1">
                     <FormLabel>Date de naissance</FormLabel>
                     <FormControl>
                       <Input
                           {...field}
                           type="date"
                           placeholder="Date de naissance"
                           required
                           value={field.value ? format(new Date(field.value), "yyyy-MM-dd") : ""}
                           onChange={(e) => field.onChange(parseDate(e.target.value))}
                       />
                     </FormControl>
                   </FormItem>
               )}
           />
         </div>

         <div className="flex flex-row gap-4">
           <FormField
             control={form.control}
             name="phoneNumber"
             render={({ field }) => (
               <FormItem className="flex-1">
                 <FormLabel>Téléphone</FormLabel>
                 <FormControl>
                   <Input
                     {...field}
                     type="number"
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
             render={({ field }) => (
               <FormItem className="flex-1">
                 <FormLabel>Ville</FormLabel>
                 <FormControl>
                   <Input {...field} type="text" placeholder="Ville" required />
                 </FormControl>
               </FormItem>
             )}
           />
         </div>

         <div className="flex flex-row gap-4">
           <FormField
             control={form.control}
             name="address"
             render={({ field }) => (
               <FormItem className="flex-1">
                 <FormLabel>Adresse</FormLabel>
                 <FormControl>
                   <Input
                     {...field}
                     type="text"
                     placeholder="Adresse"
                     required
                   />
                 </FormControl>
               </FormItem>
             )}
           />
           <FormField
             control={form.control}
             name="zipCode"
             render={({ field }) => (
               <FormItem className="flex-1">
                 <FormLabel>Code postal</FormLabel>
                 <FormControl>
                   <Input
                     {...field}
                     type="number"
                     inputMode="numeric"
                     pattern="[0-9]*"
                     placeholder="Code postal"
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
