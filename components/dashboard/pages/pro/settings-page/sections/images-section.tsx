'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getOrganizationImages } from '@/src/actions/organization.action';
import ImagesSectionClient from './components/images/images-section-client';
import { useQuery } from '@tanstack/react-query';

const ImagesSection = () => {
  const { data: images } = useQuery({
    queryKey: ['organization-images'],
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
        <ImagesSectionClient images={images?.data || []} />
      </CardContent>
    </Card>
  );
};

export default ImagesSection;
