"use client"

import { ArrowUpDown, Calendar, MoreHorizontal, Plus, Star, UserPlus, Users } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Badge,
  Button,
  Input,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getClientMetrics } from "@/src/actions/client.action"
import { ClientDetails } from "./client-details"
import { ClientForm } from "./client-form"
import { ClientMetrics } from "@/src/types/client"
import ClientsHeader from "./clients-header"
import { CountAnimation } from "@/components/common/count-animation"
import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSubscriptionCheck } from "@/src/hooks/use-subscription-check"
import SubscriptionNonPayedAlert from "@/components/subscription-non-payed-card/subscription-non-payed-card"
import { User } from "@/src/db"
import { format } from "date-fns"

const ClientMetricsComponent = () => {
  // Utiliser useQuery pour récupérer les métriques des clients
  const {
    data: metrics,
    isLoading,
    error,
  } = useQuery<ClientMetrics>({
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
      <Card className="relative overflow-hidden rounded-xl transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/20" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <div className="rounded-full bg-blue-100/80 p-2 dark:bg-blue-900/30">
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-baseline space-x-2">
            <div className="text-3xl font-bold tracking-tight">
              <CountAnimation value={metrics?.totalClients ?? 0} />
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400">+2.5%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Comparé au mois dernier</p>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden rounded-xl transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/20" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
          <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
          <div className="rounded-full bg-green-100/80 p-2 dark:bg-green-900/30">
            <UserPlus className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-baseline space-x-2">
            <div className="text-3xl font-bold tracking-tight">
              <CountAnimation value={metrics?.activeClients ?? 0} />
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400">+5.2%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Comparé au mois dernier</p>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden rounded-xl transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-900/20" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
          <CardTitle className="text-sm font-medium">Rendez-vous</CardTitle>
          <div className="rounded-full bg-purple-100/80 p-2 dark:bg-purple-900/30">
            <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-baseline space-x-2">
            <div className="text-3xl font-bold tracking-tight">
              <CountAnimation value={metrics?.appointments ?? 0} />
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400">+12.3%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Comparé au mois dernier</p>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden rounded-xl transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-900/20" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
          <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
          <div className="rounded-full bg-amber-100/80 p-2 dark:bg-amber-900/30">
            <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-baseline space-x-2">
            <div className="text-3xl font-bold tracking-tight">
              {metrics?.averageRating ?? 0}
            </div>
            <span className="text-xs">/ 5</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Basé sur 234 avis</p>
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

const ClientsPageComponent = ({ clients }: { clients: User[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [status, setStatus] = useState<string>("all")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [selectedClient, setSelectedClient] = useState<User | null>(null)
  const { shouldShowAlert, organizationId } = useSubscriptionCheck()

  const columns: ColumnDef<User>[] = [
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
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as string
        return <div className="text-sm text-muted-foreground text-center">{format(createdAt, "dd/MM/yyyy")}</div>
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
    data: clients as User[],
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
    <>
      {shouldShowAlert && organizationId && <SubscriptionNonPayedAlert organizationId={organizationId} />}
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
          </CardContent>
        </Card>

        {selectedClient && (
          <ClientDetails
            client={selectedClient as any}
            isOpen={!!selectedClient}
            onOpenChange={open => !open && setSelectedClient(null)}
          />
        )}
      </div>
    </>
  )
}

export default ClientsPageComponent
