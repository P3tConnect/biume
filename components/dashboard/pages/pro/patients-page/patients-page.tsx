"use client"

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
import { ArrowUpDown, Bird, Cat, Dog, Filter, House, MoreHorizontal, Plus, Search } from "lucide-react"
import React from "react"
import { useSubscriptionCheck } from "@/src/hooks/use-subscription-check"
import SubscriptionNonPayedAlert from "@/components/subscription-non-payed-card/subscription-non-payed-card"
import { useQuery } from "@tanstack/react-query"
import { getProPatients } from "@/src/actions/pet.action"
import { Pet } from "@/src/db"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"

const PatientsPageComponent = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [activeTab, setActiveTab] = React.useState("all")
  const [selectedPatientId, setSelectedPatientId] = React.useState<string | null>(null)
  const { shouldShowAlert, organizationId } = useSubscriptionCheck()

  // Récupération des patients
  const { data: patientsData, isLoading: isLoadingPatients } = useQuery({
    queryKey: ["pro-patients"],
    queryFn: () => getProPatients({}),
  })

  const patients = React.useMemo(() => {
    if (!patientsData?.data) return []

    // Filtrer les patients en fonction de l'onglet actif
    return patientsData.data.filter(patient => {
      if (activeTab === "all") return true
      if (activeTab === "dogs") return patient.type === "Dog"
      if (activeTab === "cats") return patient.type === "Cat"
      if (activeTab === "others") return !["Dog", "Cat"].includes(patient.type)
      return true
    })
  }, [patientsData?.data, activeTab])

  // Stats mises à jour dynamiquement
  const stats = React.useMemo(() => [
    {
      label: "Total Patients",
      value: patientsData?.data?.length || 0,
      icon: Dog,
    },
    {
      label: "Chiens",
      value: patientsData?.data?.filter(p => p.type === "Dog").length || 0,
      icon: Dog,
    },
    {
      label: "Chats",
      value: patientsData?.data?.filter(p => p.type === "Cat").length || 0,
      icon: Cat,
    },
    {
      label: "Autres",
      value: patientsData?.data?.filter(p => !["Dog", "Cat"].includes(p.type)).length || 0,
      icon: Bird,
    },
  ], [patientsData?.data])

  const columns: ColumnDef<Pet>[] = [
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
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="font-medium">{row.getValue("name")}</div>
          {row.original.type === "NAC" && (
            <Badge variant="secondary" className="text-xs">
              {row.original.nacType}
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        return (
          <div className="flex items-center gap-2">
            {type === "Dog" && <Dog className="w-4 h-4" />}
            {type === "Cat" && <Cat className="w-4 h-4" />}
            {type === "Bird" && <Bird className="w-4 h-4" />}
            {type === "Horse" && <House className="w-4 h-4" />}
            <span>{type}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "weight",
      header: "Poids (kg)",
      cell: ({ row }) => <div className="font-mono">{row.getValue("weight")} kg</div>,
    },
    {
      accessorKey: "birthDate",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date de naissance
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("birthDate"))
        return new Intl.DateTimeFormat("fr-FR").format(date)
      },
    },
    {
      accessorKey: "owner",
      header: "Propriétaire",
      cell: ({ row }) => {
        const owner = row.original.owner
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              {owner?.name?.charAt(0)}
            </div>
            <div>{owner?.name}</div>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedPatientId(row.original.id)}>
                Voir le dossier
              </DropdownMenuItem>
              <DropdownMenuItem>Nouvelle consultation</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: patients,
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
      <div className="space-y-6">
        {/* Header */}
        <Card className="overflow-hidden rounded-2xl">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Patients
                </CardTitle>
                <p className="text-sm text-muted-foreground">Gérez vos patients et leurs dossiers médicaux</p>
              </div>
              <div className="flex gap-3">
                <Credenza>
                  <CredenzaTrigger asChild>
                    <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300">
                      <Plus className="size-4 mr-2" />
                      Nouveau patient
                    </Button>
                  </CredenzaTrigger>
                  <CredenzaContent>
                    <CredenzaHeader>
                      <CredenzaTitle>Ajouter un nouveau patient</CredenzaTitle>
                      <CredenzaDescription>Formulaire d&apos;ajout de patient à implémenter</CredenzaDescription>
                    </CredenzaHeader>
                  </CredenzaContent>
                </Credenza>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="w-full rounded-xl shadow-sm">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Mes Patients</CardTitle>
            </div>
            <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="dogs">Chiens</TabsTrigger>
                  <TabsTrigger value="cats">Chats</TabsTrigger>
                  <TabsTrigger value="others">Autres</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      value={globalFilter}
                      onChange={event => setGlobalFilter(event.target.value)}
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filtres
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                      <DropdownMenuItem>Date d&apos;inscription</DropdownMenuItem>
                      <DropdownMenuItem>Âge</DropdownMenuItem>
                      <DropdownMenuItem>Type</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <TabsContent value="all" className="mt-6">
                {isLoadingPatients ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map(header => (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                          <TableRow
                            key={row.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setSelectedPatientId(row.original.id)}
                          >
                            {row.getVisibleCells().map(cell => (
                              <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
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
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        <AnimalCredenza
          isOpen={!!selectedPatientId}
          onOpenChange={(open) => {
            if (!open) setSelectedPatientId(null)
          }}
          petId={selectedPatientId || ""}
        />
      </div>
    </>
  )
}

export default PatientsPageComponent
