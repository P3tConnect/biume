import { Organization } from "@/src/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star } from "lucide-react";
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

interface OrganizationsGridProps {
  organizations: Organization[];
}

export function OrganizationsGrid({ organizations }: OrganizationsGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {organizations.map((organization) => (
        <div key={organization.id} className="flex flex-col bg-card rounded-lg border border-border hover-card-effect">
          {/* Carousel */}
          <div className="w-full h-[200px] relative">
            <Carousel className="w-full h-full">
              <CarouselContent>
                {organization.images && organization.images.length > 0 ? (
                  organization.images.map(
                    (image) =>
                      image.imageUrl && (
                        <CarouselItem key={image.id}>
                          <div className="relative w-full h-[200px]">
                            <Image
                              src={image.imageUrl}
                              alt={`Image de ${organization.name}`}
                              fill
                              className="object-cover rounded-t-lg"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority
                            />
                          </div>
                        </CarouselItem>
                      )
                  )
                ) : (
                  <CarouselItem>
                    <div className="relative w-full h-[200px] bg-accent rounded-t-lg" />
                  </CarouselItem>
                )}
              </CarouselContent>
              {organization.images && organization.images.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                </>
              )}
            </Carousel>
            <Badge className="absolute top-3 left-3 z-10 bg-secondary hover:bg-secondary/90 transition-colors">
              Disponible aujourd&apos;hui
            </Badge>
          </div>

          {/* Content */}
          <Link href={`/pros/${organization.id}`} className="flex-1 p-4 hover:bg-accent/50 transition-colors rounded-b-lg">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">
                  {organization.name}
                </h3>
                <div className="flex items-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-card-foreground">
                    4.8
                  </span>
                  <span className="text-muted-foreground text-sm">(124)</span>
                </div>
              </div>
              <Badge variant="outline" className="whitespace-nowrap">
                À partir de 35€
              </Badge>
            </div>

            {/* Availabilities */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Prochaines disponibilités</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(!organization.slots || organization.slots.length === 0) ? (
                  <p className="text-sm text-muted-foreground">Plus de disponibilités pour aujourd&apos;hui</p>
                ) : (
                  organization.slots.map((slot) => (
                    <>
                      <Button
                        key={slot.id}
                        variant="outline"
                        size="sm"
                        className="whitespace-nowrap custom-button"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {moment(slot.start).format("HH:mm")}
                      </Button>
                    </>
                  ))
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
