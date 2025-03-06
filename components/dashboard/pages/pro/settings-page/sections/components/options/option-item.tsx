"use client";

import { Option } from "@/src/db";
import { Button } from "@/components/ui/button";
import { Euro, Pencil, Trash } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface OptionItemProps {
  option: Option;
  onEdit: (option: Option) => void;
}

export const OptionItem = ({ option, onEdit }: OptionItemProps) => {
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
        <div className="flex-1">
          <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
            {option.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full">
              <Euro className="h-4 w-4" />
              <span className="font-medium">{option.price} €</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground flex-1">
        {option.description}
      </p>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all",
          "hover:bg-primary/10 hover:text-primary",
        )}
        onClick={() => onEdit(option)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
};
