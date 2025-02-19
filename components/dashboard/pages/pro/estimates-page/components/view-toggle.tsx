"use client";

import { LayoutGrid, Table } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ViewToggleProps {
  value: "table" | "kanban";
  onValueChange: (value: "table" | "kanban") => void;
}

export function ViewToggle({ value, onValueChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 rounded-md border p-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            pressed={value === "table"}
            onPressedChange={() => onValueChange("table")}
            size="sm"
            variant="outline"
          >
            <Table className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Vue tableau</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            pressed={value === "kanban"}
            onPressedChange={() => onValueChange("kanban")}
            size="sm"
            variant="outline"
          >
            <LayoutGrid className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Vue kanban</TooltipContent>
      </Tooltip>
    </div>
  );
} 