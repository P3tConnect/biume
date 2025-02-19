"use client";

import { Service } from "@/src/db";
import { Button } from "@/components/ui/button";
import { Clock, Euro, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { toast } from "sonner";
import { use, useState } from "react";
import { ServiceForm } from "./services-form";
import { ActionResult } from "@/src/lib";

interface ServicesGridProps {
  services: Promise<ActionResult<Service[]>>;
}

export const ServicesGrid = ({ services }: ServicesGridProps) => {
  const data = use(services);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  if (!data || data.data?.length === 0) {
    return (
      <button
        type="button"
        onClick={() => {
          // TODO: Implémenter l'ajout d'un nouveau service
          toast.info("Fonctionnalité à venir");
        }}
        className={cn(
          "w-full flex flex-col items-center justify-center gap-4 p-8",
          "rounded-2xl border-2 border-dashed",
          "text-gray-500 hover:text-primary hover:border-primary",
          "transition-colors duration-200",
        )}
      >
        <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-900">
          <Plus className="h-6 w-6" />
        </div>
        <span>Ajouter votre premier service</span>
      </button>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data?.map((service) => (
          <div
            key={service.id}
            className={cn(
              "group relative p-6 rounded-xl border bg-card transition-all duration-300",
              "hover:shadow-lg hover:scale-[1.02] hover:border-primary/50",
              "dark:bg-gray-950/50 dark:backdrop-blur-xl",
            )}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.name || ""}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>📷</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium">{service.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration} min</span>
                  <span className="mx-1">·</span>
                  <Euro className="h-4 w-4" />
                  <span>{service.price} €</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3">
              {service.description}
            </p>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setSelectedService(service)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {selectedService && (
        <ServiceForm
          service={selectedService}
          open={!!selectedService}
          onOpenChange={(open) => !open && setSelectedService(null)}
        />
      )}
    </>
  );
};
