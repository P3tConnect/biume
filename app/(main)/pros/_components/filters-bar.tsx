"use client";

import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSearchParams } from "@/src/hooks/use-search-params";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const CATEGORIES = [
  "Vétérinaire",
  "Toiletteur",
  "Comportementaliste",
  "Ostéopathe",
  "Pension",
  "Éducateur",
];

export function FiltersBar() {
  const { availableToday, instantBooking, sortBy, categories } =
    useSearchParams();

  return (
    <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10 w-full">
      <div className="w-full px-8">
        <div className="flex items-center justify-start py-4 gap-4 overflow-x-auto">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filtres
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filtres avancés</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-4">
                    <Label>Catégories</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.map((category) => (
                        <Badge
                          key={category}
                          variant={
                            categories.value.includes(category)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => {
                            const newCategories = categories.value.includes(
                              category,
                            )
                              ? categories.value.filter((c) => c !== category)
                              : [...categories.value, category];
                            categories.set(newCategories);
                          }}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="available-today">
                        Disponible aujourd&apos;hui
                      </Label>
                      <Switch
                        id="available-today"
                        checked={availableToday.value}
                        onCheckedChange={availableToday.set}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="instant-booking">
                        Réservation instantanée
                      </Label>
                      <Switch
                        id="instant-booking"
                        checked={instantBooking.value}
                        onCheckedChange={instantBooking.set}
                      />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex gap-2">
              {availableToday.value && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/90 transition-colors"
                  onClick={() => availableToday.set(false)}
                >
                  Disponible aujourd&apos;hui ×
                </Badge>
              )}
              {instantBooking.value && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/90 transition-colors"
                  onClick={() => instantBooking.set(false)}
                >
                  Réservation instantanée ×
                </Badge>
              )}
              {categories.value.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/90 transition-colors"
                  onClick={() => {
                    categories.set(
                      categories.value.filter((c) => c !== category),
                    );
                  }}
                >
                  {category} ×
                </Badge>
              ))}
            </div>
          </div>
          <Select value={sortBy.value} onValueChange={sortBy.set}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommandés</SelectItem>
              <SelectItem value="nearest">Les plus proches</SelectItem>
              <SelectItem value="rating">Mieux notés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
