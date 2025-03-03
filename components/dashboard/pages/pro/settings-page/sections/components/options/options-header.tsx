"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface OptionsHeaderProps {
  onCreateNew: () => void;
}

export const OptionsHeader = ({ onCreateNew }: OptionsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Vos Options</h2>
      <Button
        className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        onClick={onCreateNew}
      >
        <Plus className="h-4 w-4" />
        Nouvelle Option
      </Button>
    </div>
  );
}; 