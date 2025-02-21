"use client";

import { Option } from "@/src/db";
import { Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { toast } from "sonner";
import { use, useState } from "react";
import { OptionForm } from "./option-form";
import { ActionResult } from "@/src/lib";
import { OptionItem } from "./option-item";

export const OptionsGrid = ({
  options,
}: {
  options: ActionResult<Option[]>;
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const data = options.data;

  if (!data || data.length === 0) {
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
        {data?.map((option) => (
          <OptionItem
            key={option.id}
            option={option}
            onEdit={setSelectedOption}
          />
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
