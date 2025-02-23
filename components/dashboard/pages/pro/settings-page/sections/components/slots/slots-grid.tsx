import React from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Clock,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { OrganizationSlots } from "@/src/db/organizationSlots";

interface SlotsGridProps {
  slots?: OrganizationSlots[];
  onAddClick: () => void;
  onEditClick?: (slotId: string) => void;
  onDeleteClick?: (slotId: string) => void;
}

const SlotsGrid = ({
  slots = [],
  onAddClick,
  onEditClick,
  onDeleteClick,
}: SlotsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <button
        onClick={onAddClick}
        className={cn(
          "w-full text-left p-4 rounded-xl border border-dashed transition-all hover:border-primary/50",
          "flex flex-col items-center justify-center min-h-[120px] gap-2",
        )}
      >
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          <Plus className="h-5 w-5 text-muted-foreground" />
        </div>
        <span className="font-medium">Ajouter un créneau</span>
        <span className="text-sm text-muted-foreground">
          Créez un nouveau créneau horaire
        </span>
      </button>

      {slots.map((slot) => (
        <div
          key={slot.id}
          className="group relative w-full p-4 rounded-xl border transition-all hover:border-primary/50"
        >
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEditClick?.(slot.id)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50"
                  onClick={() => onDeleteClick?.(slot.id)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {slot.service.duration} min
                </p>
                <Badge variant="outline" className="rounded-md text-xs">
                  {slot.service.price}€
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <p className="font-medium truncate">
                  {format(new Date(slot.start), "HH:mm")} - {format(new Date(slot.end), "HH:mm")}
                </p>
              </div>

              <p className="text-sm text-muted-foreground truncate">
                {format(new Date(slot.start), "EEEE d MMMM yyyy", { locale: fr })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlotsGrid;
