"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  FileSpreadsheet,
  Filter,
  Printer,
  Share2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ReportActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Select defaultValue="current">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sélectionner la période" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="current">Année en cours</SelectItem>
          <SelectItem value="last">Année précédente</SelectItem>
          <SelectItem value="custom">Période personnalisée</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon">
        <Filter className="size-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <Download className="size-4 mr-2" />
            Exporter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <FileSpreadsheet className="size-4 mr-2" />
            Excel
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2 className="size-4 mr-2" />
            Partager
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Printer className="size-4 mr-2" />
            Imprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}; 