import { Organization } from "@/src/db";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

interface OrganizationCardProps {
  organization: Organization;
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
  return (
    <div className="group block h-full">
      <div className="flex flex-col bg-card rounded-lg border border-border overflow-hidden h-full transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
        {/* Carousel */}
        <div className="w-full h-[220px] relative">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {organization.images && organization.images.length > 0 ? (
                organization.images.map(
                  (image) =>
                    image.imageUrl && (
                      <CarouselItem key={image.id}>
                        <div className="relative w-full h-[220px]">
                          <Image
                            src={image.imageUrl}
                            alt={`Image de ${organization.name}`}
                            fill
                            className="object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 rounded-t-lg" />
                        </div>
                      </CarouselItem>
                    ),
                )
              ) : (
                <CarouselItem>
                  <div className="relative w-full h-[220px] bg-muted rounded-t-lg flex items-center justify-center">
                    <span className="text-muted-foreground">
                      Aucune image disponible
                    </span>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            {organization.images && organization.images.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </Carousel>
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            <Badge className="bg-primary text-primary-foreground">
              Disponible aujourd&apos;hui
            </Badge>
          </div>
          <Badge
            variant="outline"
            className="absolute bottom-3 right-3 z-10 bg-black/70 text-white border-0"
          >
            À partir de 35€
          </Badge>
        </div>

        {/* Content */}
        <Link href={`/pros/${organization.id}`}>
          <div className="flex-1 p-4">
            <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
              {organization.name}
            </h3>

            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-3.5 w-3.5 ${index < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium ml-1">4.8</span>
              <span className="text-muted-foreground text-xs">(124)</span>
            </div>

            {organization.address && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="line-clamp-1">
                  {organization.address.postalAddress}
                </span>
              </div>
            )}

            {/* Availabilities */}
            <div className="border-t border-border pt-3 mt-1">
              <div className="flex items-center gap-1.5 text-xs font-medium mb-2">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span>Prochaines disponibilités</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {!organization.slots || organization.slots.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    Plus de disponibilités pour aujourd&apos;hui
                  </p>
                ) : (
                  organization.slots.slice(0, 3).map((slot) => (
                    <Badge
                      key={slot.id}
                      variant="outline"
                      className="text-xs font-normal px-2 py-0.5"
                    >
                      <Clock className="h-3 w-3 mr-1 text-primary" />
                      {moment(slot.start).format("HH:mm")}
                    </Badge>
                  ))
                )}
                {organization.slots && organization.slots.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="text-xs whitespace-nowrap"
                  >
                    +{organization.slots.length - 3} créneaux
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
