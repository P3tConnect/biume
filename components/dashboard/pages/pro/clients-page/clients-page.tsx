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
import {
  ArrowUpDown,
  Plus,
  Filter,
  MoreHorizontal,
  UserPlus,
  Users,
  Calendar,
  Star,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CountAnimation } from "@/components/count-animation";
import { ClientForm } from "./client-form";
import { ClientDetails } from "./client-details";
import ClientsHeader from "./clients-header";

// Define the type for our client data
type Client = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
  createdAt: string;
  status: "Active" | "Inactive";
};

// Fake client data
const clients: Client[] = [
  {
    id: "1",
    name: "Sophie Martin",
    email: "sophie.martin@email.com",
    phoneNumber: "+33 6 12 34 56 78",
    city: "Paris",
    country: "France",
    createdAt: "2023-12-01",
    status: "Active",
  },
  {
    id: "2",
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phoneNumber: "+33 6 98 76 54 32",
    city: "Lyon",
    country: "France",
    createdAt: "2023-12-05",
    status: "Active",
  },
  {
    id: "3",
    name: "Marie Bernard",
    email: "marie.bernard@email.com",
    phoneNumber: "+33 6 45 67 89 01",
    city: "Marseille",
    country: "France",
    createdAt: "2023-12-10",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Pierre Dubois",
    email: "pierre.dubois@email.com",
    phoneNumber: "+33 6 23 45 67 89",
    city: "Bordeaux",
    country: "France",
    createdAt: "2023-12-15",
    status: "Active",
  },
  {
    id: "5",
    name: "Claire Moreau",
    email: "claire.moreau@email.com",
    phoneNumber: "+33 6 34 56 78 90",
    city: "Toulouse",
    country: "France",
    createdAt: "2023-12-20",
    status: "Active",
  },
  {
    id: "6",
    name: "Lucas Petit",
    email: "lucas.petit@email.com",
    phoneNumber: "+33 7 12 34 56 78",
    city: "Nice",
    country: "France",
    createdAt: "2023-11-15",
    status: "Active",
  },
  {
    id: "7",
    name: "Emma Rousseau",
    email: "emma.rousseau@email.com",
    phoneNumber: "+33 7 23 45 67 89",
    city: "Strasbourg",
    country: "France",
    createdAt: "2023-11-20",
    status: "Inactive",
  },
  {
    id: "8",
    name: "Thomas Laurent",
    email: "thomas.laurent@email.com",
    phoneNumber: "+33 7 34 56 78 90",
    city: "Nantes",
    country: "France",
    createdAt: "2023-11-25",
    status: "Active",
  },
  {
    id: "9",
    name: "Léa Girard",
    email: "lea.girard@email.com",
    phoneNumber: "+33 7 45 67 89 01",
    city: "Montpellier",
    country: "France",
    createdAt: "2023-11-30",
    status: "Active",
  },
  {
    id: "10",
    name: "Hugo Leroy",
    email: "hugo.leroy@email.com",
    phoneNumber: "+33 7 56 78 90 12",
    city: "Rennes",
    country: "France",
    createdAt: "2023-12-02",
    status: "Inactive",
  },
  {
    id: "11",
    name: "Chloé Mercier",
    email: "chloe.mercier@email.com",
    phoneNumber: "+33 7 67 89 01 23",
    city: "Lille",
    country: "France",
    createdAt: "2023-12-07",
    status: "Active",
  },
  {
    id: "12",
    name: "Antoine Fournier",
    email: "antoine.fournier@email.com",
    phoneNumber: "+33 7 78 90 12 34",
    city: "Grenoble",
    country: "France",
    createdAt: "2023-12-12",
    status: "Active",
  },
  {
    id: "13",
    name: "Manon Durand",
    email: "manon.durand@email.com",
    phoneNumber: "+33 7 89 01 23 45",
    city: "Annecy",
    country: "France",
    createdAt: "2023-12-17",
    status: "Active",
  },
  {
    id: "14",
    name: "Gabriel Morel",
    email: "gabriel.morel@email.com",
    phoneNumber: "+33 7 90 12 34 56",
    city: "Aix-en-Provence",
    country: "France",
    createdAt: "2023-12-22",
    status: "Inactive",
  },
  {
    id: "15",
    name: "Sarah Lambert",
    email: "sarah.lambert@email.com",
    phoneNumber: "+33 6 01 23 45 67",
    city: "Dijon",
    country: "France",
    createdAt: "2023-12-25",
    status: "Active",
  },
  {
    id: "16",
    name: "Louis Bonnet",
    email: "louis.bonnet@email.com",
    phoneNumber: "+33 6 12 34 56 89",
    city: "Tours",
    country: "France",
    createdAt: "2023-12-27",
    status: "Active",
  },
  {
    id: "17",
    name: "Julie Fontaine",
    email: "julie.fontaine@email.com",
    phoneNumber: "+33 6 23 45 67 90",
    city: "Reims",
    country: "France",
    createdAt: "2023-12-28",
    status: "Active",
  },
  {
    id: "18",
    name: "Maxime Roux",
    email: "maxime.roux@email.com",
    phoneNumber: "+33 6 34 56 78 91",
    city: "Le Havre",
    country: "France",
    createdAt: "2023-12-29",
    status: "Inactive",
  },
  {
    id: "19",
    name: "Camille Vincent",
    email: "camille.vincent@email.com",
    phoneNumber: "+33 6 45 67 89 12",
    city: "Clermont-Ferrand",
    country: "France",
    createdAt: "2023-12-30",
    status: "Active",
  },
  {
    id: "20",
    name: "Nathan Chevalier",
    email: "nathan.chevalier@email.com",
    phoneNumber: "+33 6 56 78 90 23",
    city: "Besançon",
    country: "France",
    createdAt: "2023-12-31",
    status: "Active",
  },
];

const ClientMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountAnimation value={clients.length} />
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
            <CountAnimation
              value={clients.filter((c) => c.status === "Active").length}
            />
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
            <CountAnimation value={156} />
          </div>
          <p className="text-xs text-muted-foreground">
            +12.3% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4.8</div>
          <p className="text-xs text-muted-foreground">Based on 234 reviews</p>
        </CardContent>
      </Card>
    </div>
  );
};

const ClientActions = ({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Rechercher par nom ou email..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="active">Actifs</SelectItem>
            <SelectItem value="inactive">Inactifs</SelectItem>
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
  );
};

const ClientsPageComponent = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(
    null,
  );

  const columns: ColumnDef<Client>[] = [
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
        <div className="font-medium">{row.getValue("name")}</div>
      ),
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
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ville
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
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
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date d'inscription
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={status === "Active" ? "default" : "destructive"}
            className="rounded-full"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original;
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
                <DropdownMenuItem onClick={() => setSelectedClient(client)}>
                  Voir le profil
                </DropdownMenuItem>
                <DropdownMenuItem>Envoyer un message</DropdownMenuItem>
                <DropdownMenuItem>Planifier un rendez-vous</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Sheet>
        );
      },
    },
  ];

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
  });

  return (
    <div className="space-y-4">
      <ClientsHeader />
      <ClientMetrics />

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Mes Clients</CardTitle>
          <ClientActions
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </CardHeader>
        <CardContent>
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
                  <TableRow
                    key={row.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedClient(row.original)}
                  >
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
        </CardContent>
      </Card>

      {selectedClient && (
        <ClientDetails
          client={selectedClient}
          isOpen={!!selectedClient}
          onOpenChange={(open) => !open && setSelectedClient(null)}
        />
      )}
    </div>
  );
};

export default ClientsPageComponent;
