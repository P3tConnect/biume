"use client";

import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { useState } from "react";
// import { CaretSort } from "@phosphor-icons/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Observation {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  dueDate: Date;
  type: string;
  status: "pending" | "completed";
}

const MOCK_OBSERVATIONS: Observation[] = [
  {
    id: "1",
    clientId: "client1",
    clientName: "Sophie Martin",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Dans 2 jours
    type: "Suivi cicatrisation",
    status: "pending",
  },
  {
    id: "2",
    clientId: "client2",
    clientName: "Lucas Dubois",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Dans 1 jour
    type: "Contrôle pigmentation",
    status: "pending",
  },
  {
    id: "3",
    clientId: "client3",
    clientName: "Emma Bernard",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // Dans 4 jours
    type: "Suivi post-traitement",
    status: "completed",
  },
  {
    id: "4",
    clientId: "client4",
    clientName: "Thomas Petit",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Dans 1 jour
    type: "Évaluation résultats",
    status: "pending",
  },
];

const columnHelper = createColumnHelper<Observation>();

const columns = [
  columnHelper.accessor("clientName", {
    header: "Client",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={info.row.original.clientAvatar}
            alt={info.getValue()}
          />
          <AvatarFallback>
            {info.getValue().slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => (
      <Badge
        variant="outline"
        className={cn(
          "text-xs",
          info.row.original.status === "pending"
            ? "border-orange-200 bg-orange-100 text-orange-700"
            : "border-green-200 bg-green-100 text-green-700"
        )}
      >
        {info.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor("dueDate", {
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date d'échéance
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(info.getValue()), "d MMMM yyyy", {
          locale: fr,
        })}
      </span>
    ),
  }),
  columnHelper.accessor("id", {
    header: "Actions",
    cell: (info) => {
      const observation = info.row.original;
      return (
        <TooltipProvider>
          <div className="flex items-center gap-2">
            {observation.status === "pending" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Implémenter la logique pour marquer comme terminé
                      console.log("Marquer comme terminé:", observation.id);
                    }}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Marquer comme terminé</p>
                </TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Implémenter la navigation vers les détails
                    console.log("Voir les détails:", observation.id);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voir les détails</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    },
  }),
];

function useMockObservations() {
  return useQuery({
    queryKey: ["observations-to-make"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return MOCK_OBSERVATIONS;
    },
  });
}

export function ObservationsWidget() {
  const { data: observations, isLoading } = useMockObservations();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: observations ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">Observations à réaliser</CardTitle>
        <Link
          href="/dashboard/observations"
          className="text-sm text-muted-foreground hover:underline"
        >
          Voir tout
        </Link>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {isLoading ? (
            <ObservationsLoadingSkeleton />
          ) : observations?.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              Aucune observation à réaliser
            </p>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function ObservationsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-32" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}
