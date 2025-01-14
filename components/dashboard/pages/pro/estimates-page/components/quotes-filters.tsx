"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { useQuotesSearchParams } from "@/src/hooks/use-quotes-search-params";
import { QuoteStatus } from "@/types/quote";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const statuses: { value: QuoteStatus; label: string }[] = [
  { value: "draft", label: "Brouillon" },
  { value: "sent", label: "Envoyé" },
  { value: "accepted", label: "Accepté" },
  { value: "rejected", label: "Refusé" },
  { value: "expired", label: "Expiré" },
];

export function QuotesFilters() {
  const { status, setStatus, search, setSearch, dateRange, setDateRange } =
    useQuotesSearchParams();

  const selectedStatus = statuses.find((s) => s.value === status);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {status && (
          <Badge variant="secondary" className="h-8">
            {selectedStatus?.label}
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => setStatus(null)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        {dateRange && (
          <Badge variant="secondary" className="h-8">
            {format(new Date(dateRange), "dd/MM/yyyy", { locale: fr })}
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => setDateRange(null)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher par numéro ou client..."
            value={search ?? ""}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange ? (
                format(new Date(dateRange), "dd/MM/yyyy", { locale: fr })
              ) : (
                "Choisir une date"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateRange ? new Date(dateRange) : undefined}
              onSelect={(date) =>
                setDateRange(date ? date.toISOString() : null)
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {selectedStatus?.label ?? "Statut"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Rechercher un statut..." />
              <CommandEmpty>Aucun statut trouvé.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    onSelect={() => setStatus(status.value)}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
} 