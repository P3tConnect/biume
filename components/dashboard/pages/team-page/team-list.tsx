"use client";

import React from "react";
import {
  ColumnDef,
  useReactTable,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage, Button, Checkbox, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input, Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { ChevronDownIcon, MoreVertical, MoreVerticalIcon } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";

type Team = {
  id: string;
  avatar: string;
  name: string;
  dateAjout: string;
  roles: string[];
};

const TeamList = () => {
  const teamMembers: Team[] = [
    {
      id: "tm1",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Lucas Martin",
      dateAjout: "01/10/23",
      roles: ["Employé", "Designer"],
    },
    {
      id: "tm2",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      name: "Elise Dubois",
      dateAjout: "05/09/23",
      roles: ["Employé"],
    },
    {
      id: "tm3",
      avatar: "https://randomuser.me/api/portraits/men/47.jpg",
      name: "Thomas Bernard",
      dateAjout: "12/08/23",
      roles: ["Educateur Canin", "Manager"],
    },
    {
      id: "tm4",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      name: "Sophie Lefevre",
      dateAjout: "15/07/23",
      roles: ["Product Owner", "UI/UX Designer"],
    },
    {
      id: "tm5",
      avatar: "https://randomuser.me/api/portraits/men/25.jpg",
      name: "Antoine Dupont",
      dateAjout: "30/09/23",
      roles: ["Analyste", "Employé"],
    },
    {
      id: "tm6",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Lucas Martin",
      dateAjout: "01/10/23",
      roles: ["Employé", "Designer"],
    },
    {
      id: "tm7",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      name: "Elise Dubois",
      dateAjout: "05/09/23",
      roles: ["Employé"],
    },
    {
      id: "tm8",
      avatar: "https://randomuser.me/api/portraits/men/47.jpg",
      name: "Thomas Bernard",
      dateAjout: "12/08/23",
      roles: ["Educateur Canin", "Manager"],
    },
    {
      id: "tm9",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      name: "Sophie Lefevre",
      dateAjout: "15/07/23",
      roles: ["Product Owner", "UI/UX Designer"],
    },
    {
      id: "tm10",
      avatar: "https://randomuser.me/api/portraits/men/25.jpg",
      name: "Antoine Dupont",
      dateAjout: "30/09/23",
      roles: ["Analyste", "Employé"],
    },
    {
      id: "tm11",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Lucas Martin",
      dateAjout: "01/10/23",
      roles: ["Employé", "Designer"],
    },
    {
      id: "tm12",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      name: "Elise Dubois",
      dateAjout: "05/09/23",
      roles: ["Employé"],
    },
    {
      id: "tm13",
      avatar: "https://randomuser.me/api/portraits/men/47.jpg",
      name: "Thomas Bernard",
      dateAjout: "12/08/23",
      roles: ["Educateur Canin", "Manager"],
    },
    {
      id: "tm14",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      name: "Sophie Lefevre",
      dateAjout: "15/07/23",
      roles: ["Product Owner", "UI/UX Designer"],
    },
    {
      id: "tm15",
      avatar: "https://randomuser.me/api/portraits/men/25.jpg",
      name: "Antoine Dupont",
      dateAjout: "30/09/23",
      roles: ["Analyste", "Employé"],
    },
  ];

  const columns: ColumnDef<Team>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ row }) => (
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage src={row.getValue("avatar")} alt={row.getValue("name")} />
          <AvatarFallback className="rounded-full">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
          </AvatarFallback>
        </Avatar>
      )
    },
    {
      accessorKey: "name",
      header: "Nom",
      cell: ({ row }) => (
        <div className="flex gap-2">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "dateAjout",
      header: "Date d'ajout",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("dateAjout")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Voir le profil</DropdownMenuItem>
            <DropdownMenuItem>Modifier le profil</DropdownMenuItem>
            <DropdownMenuItem>Supprimer le profil</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }
  ];


  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: teamMembers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
};

export default TeamList;
