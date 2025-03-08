"use client"

import { useQuery } from "@tanstack/react-query"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Calendar, Loader2, MoreHorizontal, Plus, Star, UserPlus, Users } from "lucide-react"
import React from "react"

import { CountAnimation } from "@/components/count-animation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Client, getClientMetrics, getClients } from "@/src/actions/client.action"
import { ClientMetrics as ClientMetricsType } from "@/src/actions/client.action"

import { ClientDetails } from "./client-details"
import { ClientForm } from "./client-form"
import ClientsHeader from "./clients-header"

// Type pour nos données client
// type Client = {
//   id: string;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   city: string;
//   country: string;
//   createdAt: string;
//   status: "Active" | "Inactive";
// };

// Fake client data
// const clients: Client[] = [...]

const ClientMetricsComponent = () => {
  // Utiliser useQuery pour récupérer les métriques des clients
  const {
    data: metrics,
    isLoading,
    error,
  } = useQuery<ClientMetricsType>({
    queryKey: ["clientMetrics"],
    queryFn: async () => {
      const result = await getClientMetrics({})

      if ("error" in result) {
        throw new Error(result.error)
      }

      return result.data
    },
  })

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-3 w-32 bg-gray-200 animate-pulse rounded mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Erreur lors du chargement des métriques</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountAnimation value={metrics?.totalClients ?? 0} />
          </div>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
        </CardContent>
      </Card>
      <Card className="rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountAnimation value={metrics?.activeClients ?? 0} />
          </div>
          <p className="text-xs text-muted-foreground">+5.2% from last month</p>
        </CardContent>
      </Card>
      <Card className="rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Appointments</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountAnimation value={metrics?.appointments ?? 0} />
          </div>
          <p className="text-xs text-muted-foreground">+12.3% from last month</p>
        </CardContent>
      </Card>
      <Card className="rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.averageRating ?? 0}</div>
          <p className="text-xs text-muted-foreground">Based on 234 reviews</p>
        </CardContent>
      </Card>
    </div>
  )
}

const ClientActions = ({
  globalFilter,
  setGlobalFilter,
  setStatus,
  status,
}: {
  globalFilter: string
  setGlobalFilter: (value: string) => void
  setStatus: (value: string) => void
  status: string
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Rechercher par nom ou email..."
          value={globalFilter}
          onChange={event => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="Active">Actifs</SelectItem>
            <SelectItem value="Inactive">Inactifs</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nouveau Client
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Ajouter un nouveau client</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <ClientForm />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

const ClientsPageComponent = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [status, setStatus] = React.useState<string>("all")
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null)

  // Utiliser useQuery pour récupérer les clients
  const {
    data: clients = [],
    isLoading,
    error,
  } = useQuery<Client[]>({
    queryKey: ["clients", { search: globalFilter, status }],
    queryFn: async () => {
      const result = await getClients({
        search: globalFilter || undefined,
        status: (status as any) || undefined,
      })

      if ("error" in result) {
        throw new Error(result.error)
      }

      return result.data || []
    },
  })

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Nom
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phoneNumber",
      header: "Téléphone",
    },
    {
      accessorKey: "city",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Ville
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "country",
      header: "Pays",
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date d&apos;inscription
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "Active" ? "default" : "destructive"} className="rounded-full">
            {status}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original
        return (
          <Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSelectedClient(client)}>Voir le profil</DropdownMenuItem>
                <DropdownMenuItem>Envoyer un message</DropdownMenuItem>
                <DropdownMenuItem>Planifier un rendez-vous</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Sheet>
        )
      },
    },
  ]

  const table = useReactTable({
    data: clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  return (
    <div className="space-y-4">
      <ClientsHeader />
      <ClientMetricsComponent />

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Mes Clients</CardTitle>
          <ClientActions
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            status={status}
            setStatus={setStatus}
          />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Chargement des clients...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">Erreur lors du chargement des clients</div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow key={row.id} className="cursor-pointer" onClick={() => setSelectedClient(row.original)}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Aucun résultat.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedClient && (
        <ClientDetails
          client={selectedClient}
          isOpen={!!selectedClient}
          onOpenChange={open => !open && setSelectedClient(null)}
        />
      )}
    </div>
  )
}

export default ClientsPageComponent
