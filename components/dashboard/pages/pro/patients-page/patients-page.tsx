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
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const PatientsPageComponent = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

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
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        const nacType = row.original.nacType;
        return nacType ? `${type} (${nacType})` : type;
      },
    },
    {
      accessorKey: "weight",
      header: "Poids (kg)",
    },
    {
      accessorKey: "height",
      header: "Taille (cm)",
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
    },
    {
      accessorKey: "ownerName",
      header: "Propriétaire",
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
  ];

  const table = useReactTable({
    data: patients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      nameOrOwner: (row, columnId, filterValue) => {
        const name = row.getValue("name") as string;
        const owner = row.getValue("ownerName") as string;
        const search = filterValue.toLowerCase();
        return (
          name.toLowerCase().includes(search) ||
          owner.toLowerCase().includes(search)
        );
      },
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <Card className="w-full h-full rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold dark:text-gray-200 text-gray-700">
          Mes Patients
        </CardTitle>
        <div className="flex items-center gap-4 py-4">
          <Input
            placeholder="Rechercher par nom ou propriétaire..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          <Select
            value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) =>
              table.getColumn("type")?.setFilterValue(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous</SelectItem>
              <SelectItem value="Dog">Chien</SelectItem>
              <SelectItem value="Cat">Chat</SelectItem>
              <SelectItem value="Bird">Oiseau</SelectItem>
              <SelectItem value="Horse">Cheval</SelectItem>
              <SelectItem value="NAC">NAC</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                <TableRow key={row.id}>
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
  );
};

export default PatientsPageComponent;
