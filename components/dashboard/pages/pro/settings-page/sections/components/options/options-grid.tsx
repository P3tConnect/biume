"use client";

import { Option } from "@/src/db";
import { Button } from "@/components/ui/button";
import { Euro, Pencil, Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { OptionForm } from "./options-form";
import { ActionResult } from "@/src/lib";

interface OptionsGridProps {
  options: ActionResult<Option[]>;
}

export const OptionsGrid = ({ options }: OptionsGridProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  if (!options || options.data?.length === 0) {
    return (
      <button
        type="button"
        onClick={() => {
          // TODO: Implémenter l'ajout d'une nouvelle option
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
        <span>Ajouter votre première option</span>
      </button>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {options.data?.map((option) => (
          <div
            key={option.id}
            className={cn(
              "group relative p-6 rounded-xl border bg-card transition-all duration-300",
              "hover:shadow-lg hover:scale-[1.02] hover:border-primary/50",
              "dark:bg-gray-950/50 dark:backdrop-blur-xl",
            )}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium">{option.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Euro className="h-4 w-4" />
                  <span>{option.price} €</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3">
              {option.description}
            </p>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setSelectedOption(option)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {selectedOption && (
        <OptionForm
          option={selectedOption}
          open={!!selectedOption}
          onOpenChange={(open) => !open && setSelectedOption(null)}
        />
      )}
    </>
  );
};
