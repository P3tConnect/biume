import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getOrganizationImages } from "@/src/actions/organization.action";
import ImagesSectionClient from "./components/images/images-section-client";

const ImagesSection = async () => {
  const images = await getOrganizationImages({});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
        <CardDescription>
          Gérez vos images professionnelles. Ces images seront visibles sur
          votre profil public.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
          <ImagesSectionClient images={images.data || []} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default ImagesSection;
