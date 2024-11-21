"use client";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input, Textarea } from '@/components/ui'
import { useServerActionMutation, useStore } from '@/src/hooks'
import { UploadButton, UploadDropzone } from '@/src/lib/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageIcon, Loader2, PenBox, Trash2, Upload } from 'lucide-react';
import { useLocale } from 'next-intl'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useStepper } from '../../hooks/useStepper';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { CreateOrganizationSchema } from '@/src/db';

const InformationsForm = () => {
  const locale = useLocale();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [logo, setLogo] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const stepperStore = useStore(useStepper, (state) => state);
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateOrganizationSchema>>({
    resolver: zodResolver(CreateOrganizationSchema),
    defaultValues: {
      
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-6'>
        <div className='flex flex-row gap-6'>
          {/* Logo Upload Section */}
          <div className='flex flex-col items-start gap-4 w-1/4'>
            <p className='text-sm font-semibold'>Logo de votre entreprise</p>
            {logo === "" ? (
              <div className='w-full'>
                <UploadDropzone
                  endpoint="imageUploader"
                  appearance={{
                    container: "w-full h-full border-2 border-dashed border-primary/20 rounded-2xl transition-all bg-background/50 hover:bg-primary/5",
                    label: "text-primary",
                    allowedContent: "text-xs text-muted-foreground text-center",
                    uploadIcon: "hidden",
                    button: "hidden"
                  }}
                  content={{
                    label({ ready }) {
                      if (ready) return (
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <ImageIcon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="space-y-1 text-center">
                            <p className="text-xs font-medium text-primary">Glissez-déposez</p>
                            <p className="text-xs text-muted-foreground">ou cliquez</p>
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
                    }
                  }}
                  onUploadBegin={() => {
                    setIsUploading(true);
                    toast.info('Téléchargement du logo en cours...');
                  }}
                  onUploadProgress={(progress) => {
                    setUploadProgress(progress);
                  }}
                  onClientUploadComplete={(res) => {
                    setIsUploading(false);
                    setLogo(res[0].url);
                    form.setValue('logo', res[0].url);
                    toast.success('Logo téléchargé avec succès!');
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
              <div className='flex flex-col items-center gap-4'>
                <div className='group relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/20'>
                  <Image 
                    src={logo} 
                    alt='logo' 
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity'>
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
                            <Button variant="ghost" size="icon" className='rounded-xl text-white hover:text-white'>
                              <PenBox size={16} />
                            </Button>
                          )
                        },
                        allowedContent: () => ""
                      }}
                      onClientUploadComplete={(res) => {
                        setLogo(res[0].url);
                        form.setValue('logo', res[0].url);
                        toast.success('Logo mis à jour avec succès!');
                      }}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className='rounded-xl text-white hover:text-white'
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cover Image Upload Section */}
          <div className='flex flex-col items-start gap-4 w-3/4'>
            <p className='text-sm font-semibold'>Image de couverture</p>
            {coverImage === "" ? (
              <UploadDropzone
                endpoint="imageUploader"
                appearance={{
                  container: "w-full h-full border-2 border-dashed border-primary/20 rounded-2xl transition-all bg-background/50 hover:bg-primary/5",
                  label: "text-primary",
                  allowedContent: "text-xs text-muted-foreground text-center",
                  button: "hidden",
                  uploadIcon: "hidden",
                }}
                content={{
                  label({ ready }) {
                    if (ready) return (
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <ImageIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1 text-center">
                          <p className="text-xs font-medium text-primary">Glissez-déposez</p>
                          <p className="text-xs text-muted-foreground">ou cliquez</p>
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
                  }
                }}
                onUploadBegin={() => {
                  setIsUploading(true);
                  toast.info('Téléchargement de l\'image de couverture en cours...');
                }}
                onUploadProgress={(progress) => {
                  setUploadProgress(progress);
                }}
                onClientUploadComplete={(res) => {
                  setIsUploading(false);
                  setCoverImage(res[0].url);
                  form.setValue('coverImage', res[0].url);
                  toast.success('Image de couverture téléchargée avec succès!');
                }}
                onUploadError={(error) => {
                  setIsUploading(false);
                  toast.error(`Erreur: ${error.message}`);
                }}
              />
            ) : (
              <div className='relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-primary/20'>
                <Image 
                  src={coverImage} 
                  alt='cover' 
                  fill
                  className='object-cover'
                />
                <div className='absolute bottom-2 right-2 flex items-center gap-2'>
                  <UploadDropzone
                    endpoint="imageUploader"
                    appearance={{
                      container: "w-auto h-auto border-none",
                      label: "flex items-center justify-center"
                    }}
                    content={{
                      label() {
                        return (
                          <Button variant="secondary" size="icon" className='rounded-xl'>
                            <PenBox size={16} />
                          </Button>
                        )
                      },
                      allowedContent: () => ""
                    }}
                    onClientUploadComplete={(res) => {
                      setCoverImage(res[0].url);
                      form.setValue('coverImage', res[0].url);
                      toast.success('Image de couverture mise à jour avec succès!');
                    }}
                  />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className='rounded-xl'
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-semibold'>Nom de votre entreprise</FormLabel>
                <FormControl>
                  <Input type='string' placeholder='PawThera Inc.' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-semibold'>Description de votre entreprise</FormLabel>
                <FormControl>
                  <Textarea placeholder='Description de votre entreprise' {...field} value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}

export default InformationsForm