"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Quote } from "@/types/quote";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const columns: ColumnDef<Quote>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Tout sélectionner"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner la ligne"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Numéro" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("number")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
    cell: ({ row }) => {
      const client = row.getValue("client") as { name: string };
      return <div className="flex space-x-2">{client.name}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {format(new Date(row.getValue("date")), "dd/MM/yyyy", { locale: fr })}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Montant" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
          }).format(row.getValue("amount"))}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Statut" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "draft"
              ? "secondary"
              : status === "sent"
                ? "default"
                : status === "accepted"
                  ? "secondary"
                  : status === "rejected"
                    ? "destructive"
                    : "outline"
          }
        >
          {status === "draft"
            ? "Brouillon"
            : status === "sent"
              ? "Envoyé"
              : status === "accepted"
                ? "Accepté"
                : status === "rejected"
                  ? "Refusé"
                  : "Expiré"}
        </Badge>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
