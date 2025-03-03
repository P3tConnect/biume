"use client";

import { Service } from "@/src/db";
import { Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useState } from "react";
import { ServiceForm } from "./services-form";
import { ServiceItem } from "./service-item";

interface ServicesGridProps {
  services: Service[];
  onAddFirstService: () => void;
}

export const ServicesGrid = ({ services, onAddFirstService }: ServicesGridProps) => {
  const data = services;
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  if (!data || data.length === 0) {
    return (
      <button
        type="button"
        onClick={onAddFirstService}
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
        {data?.map((service) => (
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
