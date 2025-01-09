"use client";

import React from "react";
import {
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Edit2, MoreHorizontal, Shield, Trash2, User } from "lucide-react";

type Team = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  dateAjout: string;
  status: "active" | "inactive";
};

const roleIcons = {
  owner: Shield,
  admin: Shield,
  member: User,
};

const roleColors = {
  owner: "text-yellow-500",
  admin: "text-blue-500",
  member: "text-gray-500",
};

const statusColors = {
  active: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  inactive: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
};

const TeamList = () => {
  const teamMembers: Team[] = [
    {
      id: "tm1",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Lucas Martin",
      email: "lucas.martin@example.com",
      role: "owner",
      dateAjout: "01/10/23",
      status: "active",
    },
    {
      id: "tm2",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      name: "Elise Dubois",
      email: "elise.dubois@example.com",
      role: "admin",
      dateAjout: "05/09/23",
      status: "active",
    },
    {
      id: "tm3",
      avatar: "https://randomuser.me/api/portraits/men/47.jpg",
      name: "Thomas Bernard",
      email: "thomas.bernard@example.com",
      role: "member",
      dateAjout: "12/08/23",
      status: "inactive",
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<Team>[] = [
    {
      accessorKey: "name",
      header: "Membre",
      cell: ({ row }) => {
        const RoleIcon = roleIcons[row.original.role];
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
              <AvatarFallback>
                {row.original.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="font-medium">{row.original.name}</div>
              <div className="text-sm text-muted-foreground">
                {row.original.email}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Rôle",
      cell: ({ row }) => {
        const RoleIcon = roleIcons[row.original.role];
        return (
          <div className="flex items-center gap-2">
            <RoleIcon className={`h-4 w-4 ${roleColors[row.original.role]}`} />
            <span className="capitalize">{row.original.role}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={statusColors[row.original.status]}
        >
          {row.original.status === "active" ? "Actif" : "Inactif"}
        </Badge>
      ),
    },
    {
      accessorKey: "dateAjout",
      header: "Date d'ajout",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex gap-2">
                <Edit2 className="h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-2 text-destructive focus:text-destructive">
                <Trash2 className="h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: teamMembers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Aucun membre trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamList;
