'use client';

import React, { useCallback, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOrganizationImages } from "@/src/actions/organization.action";
import ImagesSectionClient from "./components/images/images-section-client";
import { useQuery } from "@tanstack/react-query";

const ImagesSection = () => {
  const { data: images } = useQuery({
    queryKey: ["organization-images"],
    queryFn: () => getOrganizationImages({}),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
        <CardDescription>
          Gérez vos images professionnelles. Ces images seront visibles sur
          votre profil public.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-primary bg-primary/10'
              : 'border-muted-foreground/20'
          )}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className='flex flex-col items-center space-y-4'>
              <Loader2 className='h-8 w-8 animate-spin text-primary' />
              <p>Téléchargement en cours...</p>
              <div className='w-full max-w-xs space-y-2'>
                <Progress value={uploadProgress / 100} className='h-2' />
                <p className='text-sm text-muted-foreground text-center'>
                  {Math.round(uploadProgress)}%
                </p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center space-y-2'>
              <ImageIcon className='h-8 w-8 text-muted-foreground' />
              <p>Glissez-déposez vos images ici ou cliquez pour sélectionner</p>
              <p className='text-sm text-muted-foreground'>
                PNG, JPG, JPEG ou WEBP (max 5 images)
              </p>
            </div>
          )}
        </div>

        {images.data!.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {images.data!.map((image, index) => (
              <div
                key={index}
                className='relative group aspect-square w-64 h-64'
              >
                <Image
                  src={image.imageUrl ?? ''}
                  alt={image.name ?? ''}
                  fill
                  className='object-cover rounded-xl shadow-sm'
                />
                <Button
                  variant='destructive'
                  size='icon'
                  className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8'
                  onClick={() => handleDeleteImage(image.imageUrl ?? '')}
                >
                  <X className='h-5 w-5' />
                </Button>
              </div>
            ))}
          </div>
        )}
      <CardContent className="space-y-6">
        <ImagesSectionClient images={images?.data || []} />
      </CardContent>
    </Card>
  );
};

export default ImagesSection;
