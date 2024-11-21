"use client";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input, Textarea } from '@/components/ui'
import { createCompany } from '@/src/actions'
import { CreateCompanySchema } from '@/src/db'
import { useServerActionMutation, useStore } from '@/src/hooks'
import { UploadButton, UploadDropzone } from '@/src/lib/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod'
import { PenBox, Trash2 } from 'lucide-react';
import { useLocale } from 'next-intl'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useStepper } from '../../hooks/useStepper';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/src/lib';

const InformationsForm = () => {
  const locale = useLocale();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [logo, setLogo] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const stepperStore = useStore(useStepper, (state) => state);
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateCompanySchema>>({
    resolver: zodResolver(CreateCompanySchema),
    defaultValues: {
      name: '',
      logo,
      coverImage: '',
      description: '',
      email: '',
      lang: locale,
    },
  });

  const { mutateAsync } = useServerActionMutation(createCompany, {
    onSuccess: () => {
      stepperStore?.setSuccessStep(1)
      router.push("/onboarding/services");
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  console.log(logo);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-4'>
        <div className='flex flex-row items-center gap-2'>
          <div className='flex flex-col items-start gap-2 w-1/2'>
            <p className='text-sm font-semibold'>Logo de votre entreprise</p>
            {logo == "" ? <UploadButton
              endpoint="imageUploader"
              config={{ cn: cn }}
              className='ut-button:bg-primary ut-button:rounded-xl'
              appearance={{
                button: "",
                allowedContent: "",
                container: "",
                clearBtn: "",
              }}
              onUploadProgress={setUploadProgress}
              onClientUploadComplete={(value) => {
                setLogo(value[0].url)
              }}
            /> : (
              <div className='flex flex-col items-center gap-2'>
                <Image src={logo} alt='logo' width={100} height={100} className='rounded-2xl' />
                <div className='flex flex-row items-center gap-2'>
                  <Button variant="ghost" size="icon" className='rounded-2xl'>
                    <PenBox size={16} />
                  </Button>
                  <Button variant="destructive" size="icon" className='rounded-2xl'>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
        <div className='flex flex-col items-start gap-2 w-1/2'>
          <p className='text-sm font-semibold'>Image de couverture de votre entreprise</p>
          {coverImage == "" ? <UploadDropzone
            endpoint="imageUploader"
            onUploadProgress={setUploadProgress}
            onClientUploadComplete={(value) => {
              setCoverImage(value[0].url)
            }}
          /> : <Image src={coverImage} alt='logo' width={100} height={100} className='rounded-2xl' />}
        </div>
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
      </form>
    </Form>
  )
}

export default InformationsForm