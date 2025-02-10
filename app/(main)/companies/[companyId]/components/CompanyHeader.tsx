"use client";

import { Button } from "@/components/ui";
import { Organization, Rating, Option, Service } from "@/src/db";
import { Heart, MapPin, Share2, Star, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CompanyHeaderProps {
  company: Organization;
}

export function CompanyHeader({ company }: CompanyHeaderProps) {
  const defaultImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
    "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6",
    "https://images.unsplash.com/photo-1486299267070-83823f5448dd",
  ];

  const displayImages = defaultImages;

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-4">
          <div className="flex items-center">
            <Link
              href="/companies"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Retour aux résultats
            </Link>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-2">{company.name}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">4.8/5</span>
              <span className="text-muted-foreground">·</span>
              <button className="font-medium underline-offset-4 hover:underline">
                {company.ratings.reduce((acc, curr) => acc + curr.rate, 0) / company.ratings.length} sur 5
              </button>
            </div>
            <span className="text-muted-foreground">·</span>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <button className="font-medium underline-offset-4 hover:underline">
                Unknown
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Heart className="h-4 w-4" />
              Enregistrer
            </Button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto">
        <div className="aspect-[2/1] rounded-xl overflow-hidden grid grid-cols-4 grid-rows-2 gap-2">
          <div className="col-span-2 row-span-2 relative">
            <Image
              src={displayImages[0]}
              alt={`${company.name} - Image principale`}
              fill
              className="object-cover hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
          <div className="relative">
            <Image
              src={displayImages[1]}
              alt={`${company.name} - Image 2`}
              fill
              className="object-cover hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
          <div className="relative">
            <Image
              src={displayImages[2]}
              alt={`${company.name} - Image 3`}
              fill
              className="object-cover hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
          <div className="relative">
            <Image
              src={displayImages[3]}
              alt={`${company.name} - Image 4`}
              fill
              className="object-cover hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
          <div className="relative">
            <Image
              src={displayImages[4]}
              alt={`${company.name} - Image 5`}
              fill
              className="object-cover hover:opacity-90 transition-opacity cursor-pointer rounded-tr-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
