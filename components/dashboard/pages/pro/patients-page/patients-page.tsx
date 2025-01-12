"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Dog, Cat, Bird, House, Search, Plus, MoreHorizontal, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define the type for our patient data
type Patient = {
  id: string;
  name: string;
  type: "Dog" | "Cat" | "Bird" | "Horse" | "NAC";
  nacType?: string;
  weight?: number;
  height?: number;
  birthDate: string;
  furColor?: string;
  eyeColor?: string;
  ownerName: string;
  createdAt: string;
};

// Fake patient data
const patients: Patient[] = [
  {
    id: "1",
    name: "Luna",
    type: "Dog",
    weight: 25,
    height: 60,
    birthDate: "2020-05-15",
    furColor: "Golden",
    eyeColor: "Brown",
    ownerName: "Sophie Martin",
    createdAt: "2023-12-01",
  },
  {
    id: "2",
    name: "Milo",
    type: "Cat",
    weight: 4,
    height: 25,
    birthDate: "2021-03-10",
    furColor: "Black",
    eyeColor: "Green",
    ownerName: "Jean Dupont",
    createdAt: "2023-12-05",
  },
  {
    id: "3",
    name: "Rio",
    type: "Bird",
    weight: 0.3,
    height: 15,
    birthDate: "2022-01-20",
    furColor: "Blue",
    eyeColor: "Black",
    ownerName: "Marie Bernard",
    createdAt: "2023-12-10",
  },
  {
    id: "4",
    name: "Spirit",
    type: "Horse",
    weight: 450,
    height: 160,
    birthDate: "2019-08-05",
    furColor: "Brown",
    eyeColor: "Brown",
    ownerName: "Pierre Dubois",
    createdAt: "2023-12-15",
  },
  {
    id: "5",
    name: "Buddy",
    type: "NAC",
    nacType: "Rabbit",
    weight: 2,
    height: 20,
    birthDate: "2022-06-12",
    furColor: "White",
    eyeColor: "Red",
    ownerName: "Claire Moreau",
    createdAt: "2023-12-20",
  },
  {
    id: "6",
    name: "Max",
    type: "Dog",
    weight: 30,
    height: 65,
    birthDate: "2020-02-28",
    furColor: "Black and White",
    eyeColor: "Blue",
    ownerName: "Lucas Petit",
    createdAt: "2023-11-15",
  },
  {
    id: "7",
    name: "Simba",
    type: "Cat",
    weight: 5,
    height: 28,
    birthDate: "2021-07-14",
    furColor: "Orange",
    eyeColor: "Yellow",
    ownerName: "Emma Rousseau",
    createdAt: "2023-11-20",
  },
  {
    id: "8",
    name: "Charlie",
    type: "NAC",
    nacType: "Hamster",
    weight: 0.1,
    height: 8,
    birthDate: "2023-01-05",
    furColor: "Brown",
    eyeColor: "Black",
    ownerName: "Thomas Laurent",
    createdAt: "2023-11-25",
  },
  {
    id: "9",
    name: "Storm",
    type: "Horse",
    weight: 480,
    height: 165,
    birthDate: "2018-12-20",
    furColor: "Black",
    eyeColor: "Brown",
    ownerName: "Léa Girard",
    createdAt: "2023-11-30",
  },
  {
    id: "10",
    name: "Coco",
    type: "Bird",
    weight: 0.4,
    height: 18,
    birthDate: "2022-09-15",
    furColor: "Green",
    eyeColor: "Black",
    ownerName: "Hugo Leroy",
    createdAt: "2023-12-02",
  },
];

// Nouvelles statistiques
const stats = [
  {
    label: "Total Patients",
    value: patients.length,
    icon: Dog,
  },
  {
    label: "Chiens",
    value: patients.filter(p => p.type === "Dog").length,
    icon: Dog,
  },
  {
    label: "Chats",
    value: patients.filter(p => p.type === "Cat").length,
    icon: Cat,
  },
  {
    label: "Autres",
    value: patients.filter(p => !["Dog", "Cat"].includes(p.type)).length,
    icon: Bird,
  },
];

const PatientsPageComponent = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [activeTab, setActiveTab] = React.useState("all");

  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nom
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
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
        const type = row.getValue("type") as string;
        return (
          <div className="flex items-center gap-2">
            {type === "Dog" && <Dog className="w-4 h-4" />}
            {type === "Cat" && <Cat className="w-4 h-4" />}
            {type === "Bird" && <Bird className="w-4 h-4" />}
            {type === "Horse" && <House className="w-4 h-4" />}
            <span>{type}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "weight",
      header: "Poids (kg)",
      cell: ({ row }) => (
        <div className="font-mono">{row.getValue("weight")} kg</div>
      ),
    },
    {
      accessorKey: "birthDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date de naissance
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("birthDate"));
        return new Intl.DateTimeFormat("fr-FR").format(date);
      },
    },
    {
      accessorKey: "ownerName",
      header: "Propriétaire",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            {row.getValue<string>("ownerName").charAt(0)}
          </div>
          <div>{row.getValue("ownerName")}</div>
        </div>
      ),
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
              <DropdownMenuItem>Voir le dossier</DropdownMenuItem>
              <DropdownMenuItem>Nouvelle consultation</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
  });

  return (
    <div className="space-y-6">
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
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
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
            <CardTitle className="text-xl font-semibold">
              Mes Patients
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nouveau patient
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau patient</DialogTitle>
                  <DialogDescription>
                    Formulaire d'ajout de patient à implémenter
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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
                    onChange={(event) => setGlobalFilter(event.target.value)}
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
                    <DropdownMenuItem>Date d'inscription</DropdownMenuItem>
                    <DropdownMenuItem>Âge</DropdownMenuItem>
                    <DropdownMenuItem>Type</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="all" className="mt-6">
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
                              header.getContext(),
                            )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} className="cursor-pointer hover:bg-muted/50">
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        Aucun résultat.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PatientsPageComponent;
