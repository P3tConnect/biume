import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Clock, MoreVertical, Pencil, Plus, Repeat, Trash } from "lucide-react"
import React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { OrganizationSlots } from "@/src/db/organizationSlots"
import { cn } from "@/src/lib/utils"

interface SlotsGridProps {
  slots?: OrganizationSlots[]
  onAddClick: () => void
  onEditClick?: (slotId: string) => void
  onDeleteClick?: (slotId: string) => void
}

// Types pour le regroupement des créneaux
interface UniqueSlotGroup {
  type: "unique"
  slot: OrganizationSlots
  slots: OrganizationSlots[]
}

interface RecurringSlotGroup {
  type: "recurring"
  slot: OrganizationSlots
  slots: OrganizationSlots[]
  recurrenceId: string
}

type SlotGroup = UniqueSlotGroup | RecurringSlotGroup

// Fonction pour grouper les slots par récurrence
const groupSlotsByRecurrence = (slots: OrganizationSlots[]): SlotGroup[] => {
  const grouped: { [key: string]: OrganizationSlots[] } = {}
  const singles: OrganizationSlots[] = []

  slots.forEach(slot => {
    if (slot.type === "recurring" && slot.recurrenceId) {
      if (!grouped[slot.recurrenceId]) {
        grouped[slot.recurrenceId] = []
      }
      grouped[slot.recurrenceId].push(slot)
    } else {
      singles.push(slot)
    }
  })

  // Convertir le résultat en format uniforme
  const result: SlotGroup[] = [
    ...singles.map(slot => ({ type: "unique" as const, slot, slots: [slot] })),
    ...Object.entries(grouped).map(([recurrenceId, slots]) => ({
      type: "recurring" as const,
      slot: slots[0], // Utiliser le premier slot comme représentant
      slots,
      recurrenceId,
    })),
  ]

  return result
}

const SlotsGrid = ({ slots = [], onAddClick, onEditClick, onDeleteClick }: SlotsGridProps) => {
  const groupedSlots = groupSlotsByRecurrence(slots)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <button
        onClick={onAddClick}
        className={cn(
          "w-full text-left p-4 rounded-xl border border-dashed transition-all hover:border-primary/50",
          "flex flex-col items-center justify-center min-h-[120px] gap-2"
        )}
      >
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          <Plus className="h-5 w-5 text-muted-foreground" />
        </div>
        <span className="font-medium">Ajouter un créneau</span>
        <span className="text-sm text-muted-foreground">Créez un nouveau créneau horaire</span>
      </button>

      {groupedSlots.map(group => (
        <div
          key={group.type === "recurring" ? `rec-${(group as RecurringSlotGroup).recurrenceId}` : group.slot.id}
          className="group relative w-full p-4 rounded-xl border transition-all hover:border-primary/50"
        >
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {group.type === "unique" ? (
                  <DropdownMenuItem onClick={() => onEditClick?.(group.slot.id)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => onEditClick?.(group.slot.id)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Modifier le premier créneau
                  </DropdownMenuItem>
                )}
                {group.type === "unique" ? (
                  <DropdownMenuItem
                    className="text-red-500 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50"
                    onClick={() => onDeleteClick?.(group.slot.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="text-red-500 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/50"
                    onClick={() => onDeleteClick?.((group as RecurringSlotGroup).recurrenceId)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Supprimer tous les créneaux
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              {group.type === "recurring" ? (
                <Repeat className="h-4 w-4 text-primary" />
              ) : (
                <Clock className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{group.slot.service.duration} min</p>
                <Badge variant="outline" className="rounded-md text-xs">
                  {group.slot.service.price}€
                </Badge>
                {group.type === "recurring" && (
                  <Badge variant="secondary" className="rounded-md text-xs">
                    Récurrent ({group.slots.length} créneaux)
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                <p className="font-medium truncate">
                  {format(new Date(group.slot.start), "HH:mm")} - {format(new Date(group.slot.end), "HH:mm")}
                </p>
              </div>

              <p className="text-sm text-muted-foreground truncate">
                {group.type === "recurring"
                  ? `Créneaux du ${format(new Date(group.slots[0].start), "d MMMM", { locale: fr })} au ${format(new Date(group.slots[group.slots.length - 1].start), "d MMMM yyyy", { locale: fr })}`
                  : format(new Date(group.slot.start), "EEEE d MMMM yyyy", { locale: fr })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SlotsGrid
