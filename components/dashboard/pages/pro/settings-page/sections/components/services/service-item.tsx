import { Service } from "@/src/db";
import { Button } from "@/components/ui/button";
import { Clock, Euro, Pencil } from "lucide-react";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

interface ServiceItemProps {
  service: Service;
  onEdit: (service: Service) => void;
}

export const ServiceItem = ({ service, onEdit }: ServiceItemProps) => {
  return (
    <div
      className={cn(
        "group relative p-6 rounded-xl border bg-card transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02] hover:border-primary/50",
        "dark:bg-gray-950/50 dark:backdrop-blur-xl",
        "flex flex-col h-full",
      )}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.name || ""}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
              📷
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
            {service.name}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <Euro className="h-4 w-4" />
              <span className="font-medium">{service.price} €</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/50 text-muted-foreground px-3 py-1 rounded-full text-sm">
              <Clock className="h-4 w-4" />
              <span>{service.duration} min</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground flex-1">
        {service.description}
      </p>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all",
          "hover:bg-primary/10 hover:text-primary",
        )}
        onClick={() => onEdit(service)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
};
