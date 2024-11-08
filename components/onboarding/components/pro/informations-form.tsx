"use client";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, Input, Textarea } from '@/components/ui'
import { createCompany } from '@/src/actions'
import { CreateCompanySchema } from '@/src/db'
import { useServerActionMutation } from '@/src/hooks'
import { UploadDropzone } from '@/src/lib/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadCloudIcon } from 'lucide-react';
import { useLocale } from 'next-intl'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const InformationsForm = () => {
  const locale = useLocale();
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm<z.infer<typeof CreateCompanySchema>>({
    resolver: zodResolver(CreateCompanySchema),
    defaultValues: {
      name: '',
      logo: '',
      coverImage: '',
      description: '',
      email: '',
      lang: locale,
    },
  });

  const { mutateAsync } = useServerActionMutation(createCompany, {});

  const onSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-4'>
        <div className=''>
          <p className='text-sm font-semibold'>Image de couverture de votre entreprise</p>
          <UploadDropzone
            endpoint="imageUploader"
            content={{
              button: ({ uploadProgress, files, }) => (
                <Button className='rounded-xl mx-2'>
                  <p>Ajouter une image</p>
                </Button>
              ),
              // label: ({ files, isUploading, uploadProgress }) => (
              //   <></>
              // ),
            }}
            onUploadProgress={setUploadProgress}
          />
        </div>
        <FormField
          control={form.control}
          name='coverImage'
          render={({ field }) => (
            <FormItem className='w-1/2'>
              <FormLabel className='text-sm font-semibold' htmlFor='picture'>Image de couverture de votre entreprise</FormLabel>
              <FormControl>
                <Input type='file' placeholder='Image de couverture de votre entreprise' {...field} value={field.value ?? ''} />
              </FormControl>
            </FormItem>
          )}
        />
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