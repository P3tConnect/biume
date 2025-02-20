"use client";

import { Service } from "@/src/db";
import { Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { toast } from "sonner";
import { use, useState } from "react";
import { ServiceForm } from "./services-form";
import { ActionResult } from "@/src/lib";
import { ServiceItem } from "./service-item";

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
          <ServiceItem
            key={service.id}
            service={service}
            onEdit={setSelectedService}
          />
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
