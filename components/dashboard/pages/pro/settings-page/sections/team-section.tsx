"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Plus, Mail, Shield, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useActiveOrganization, organization } from "@/src/lib/auth-client";

// Types temporaires pour l'exemple
type Role = "admin" | "member" | "owner";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  status: "active" | "pending";
}

const inviteFormSchema = z.object({
  email: z.string().email("Email invalide"),
  role: z.enum(["admin", "member", "owner"], {
    required_error: "Veuillez sélectionner un rôle",
  }),
});

const mockMembers: TeamMember[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie@example.com",
    role: "member",
    status: "active",
  },
  {
    id: "3",
    name: "Pierre Durant",
    email: "pierre@example.com",
    role: "member",
    status: "pending",
  },
];

export const TeamSection = () => {
  const [open, setOpen] = React.useState(false);
  const { data: activeOrganization } = useActiveOrganization();
  const form = useForm<z.infer<typeof inviteFormSchema>>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      role: "member",
    },
  });

  async function onSubmit(values: z.infer<typeof inviteFormSchema>) {
    try {
      if (!activeOrganization) {
        throw new Error("Aucune organisation active");
      }

      await organization.inviteMember({
        email: values.email,
        role: values.role,
        organizationId: activeOrganization.id,
      });

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gestion de l'équipe</CardTitle>
          <CardDescription>
            Gérez les membres de votre équipe et leurs rôles
          </CardDescription>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Inviter un membre
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inviter un nouveau membre</DialogTitle>
              <DialogDescription>
                Envoyez une invitation par email pour rejoindre votre équipe.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="membre@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rôle</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un rôle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="member">Membre</SelectItem>
                          <SelectItem value="admin">Administrateur</SelectItem>
                          <SelectItem value="owner">Propriétaire</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">Envoyer l'invitation</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Membre</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatarUrl} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={member.role === "admin" ? "default" : "secondary"}
                      className="flex w-fit items-center gap-1"
                    >
                      <Shield className="h-3 w-3" />
                      {member.role === "admin" ? "Administrateur" : "Membre"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={member.status === "active" ? "default" : "secondary"}
                    >
                      {member.status === "active" ? "Actif" : "En attente"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {member.status === "pending" && (
                          <DropdownMenuItem className="gap-2">
                            <Mail className="h-4 w-4" />
                            Renvoyer l'invitation
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="gap-2">
                          <Shield className="h-4 w-4" />
                          Changer le rôle
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive gap-2">
                          <Trash2 className="h-4 w-4" />
                          Retirer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}; 