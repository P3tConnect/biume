import React from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Clock,
  MoreVertical,
  Pencil,
  Trash,
  CalendarIcon,
  RepeatIcon,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface SlotsGridProps {
  slots?: Array<{
    id: string;
    type: "unique" | "recurring";
    startTime: string;
    endTime: string;
    duration: string;
    date: string;
    selectedDays?: string[];
  }>;
  onAddClick: () => void;
  onEditClick?: (slotId: string) => void;
  onDeleteClick?: (slotId: string) => void;
}

const weekDays = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};

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
              {slot.type === "unique" ? (
                <CalendarIcon className="h-4 w-4 text-primary" />
              ) : (
                <RepeatIcon className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                <Badge
                  variant={slot.type === "unique" ? "outline" : "default"}
                  className="rounded-md text-xs"
                >
                  {slot.type === "unique" ? "Unique" : "Récurrent"}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {slot.duration} min
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="font-medium truncate">
                  {slot.startTime} - {slot.endTime}
                </p>
              </div>

              {slot.type === "unique" ? (
                <p className="text-sm text-muted-foreground truncate">
                  {slot.date}
                </p>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {slot.selectedDays?.map((day) => (
                    <Badge key={day} variant="secondary" className="text-xs">
                      {weekDays[day as keyof typeof weekDays].slice(0, 3)}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlotsGrid;
