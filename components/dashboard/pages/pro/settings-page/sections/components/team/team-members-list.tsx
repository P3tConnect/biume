"use client"

import { MoreHorizontal, Shield, Trash2 } from "lucide-react"
import React from "react"

import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Organization } from "@/src/db/organization"
import { organization as organizationUtil } from "@/src/lib/auth-client"

type Role = "admin" | "member" | "owner"

interface TeamMembersListProps {
  organization: Organization
}

export const TeamMembersList = ({ organization }: TeamMembersListProps) => {
  const [selectedMember, setSelectedMember] = React.useState<{
    id: string
    role: Role
    name?: string
  } | null>(null)
  const [isChangingRole, setIsChangingRole] = React.useState(false)
  const [isConfirmingRemove, setIsConfirmingRemove] = React.useState(false)

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Membre</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organization.members.map(member => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.user.image || ""} />
                    <AvatarFallback>
                      {member.user.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.user.name}</div>
                    <div className="text-sm text-muted-foreground">{member.user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={member.role === "owner" ? "default" : "secondary"}
                  className="flex w-fit items-center gap-1"
                >
                  <Shield className="h-3 w-3" />
                  {member.role === "owner" ? "Propriétaire" : member.role === "admin" ? "Administrateur" : "Membre"}
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
                    <DropdownMenuItem
                      className="gap-2"
                      onClick={() => {
                        setSelectedMember({
                          id: member.id,
                          role: member.role as Role,
                        })
                        setIsChangingRole(true)
                      }}
                    >
                      <Shield className="h-4 w-4" />
                      Changer le rôle
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive gap-2"
                      onClick={() => {
                        setSelectedMember({
                          id: member.id,
                          role: member.role as Role,
                          name: member.user.name,
                        })
                        setIsConfirmingRemove(true)
                      }}
                    >
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

      <Credenza open={isChangingRole} onOpenChange={setIsChangingRole}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Changer le rôle</CredenzaTitle>
            <CredenzaDescription>Sélectionnez le nouveau rôle pour ce membre.</CredenzaDescription>
          </CredenzaHeader>
          <div className="space-y-4 py-4">
            <Select
              value={selectedMember?.role}
              onValueChange={async (value: Role) => {
                try {
                  if (!selectedMember) {
                    throw new Error("Données manquantes")
                  }
                  await organizationUtil.updateMemberRole({
                    memberId: selectedMember.id,
                    organizationId: organization.id,
                    role: value,
                  })
                  setIsChangingRole(false)
                  setSelectedMember(null)
                } catch (error) {
                  console.error(error)
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Membre</SelectItem>
                <SelectItem value="admin">Administrateur</SelectItem>
                <SelectItem value="owner">Propriétaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CredenzaFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsChangingRole(false)
                setSelectedMember(null)
              }}
            >
              Annuler
            </Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>

      <Credenza open={isConfirmingRemove} onOpenChange={setIsConfirmingRemove}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Confirmer la suppression</CredenzaTitle>
            <CredenzaDescription>
              Êtes-vous sûr de vouloir retirer {selectedMember?.name} de l&apos;équipe ? Cette action est irréversible.
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsConfirmingRemove(false)
                setSelectedMember(null)
              }}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={async () => {
                try {
                  if (!selectedMember) {
                    throw new Error("Données manquantes")
                  }
                  await organizationUtil.removeMember({
                    memberIdOrEmail: selectedMember.id,
                    organizationId: organization.id,
                  })
                  setIsConfirmingRemove(false)
                  setSelectedMember(null)
                } catch (error) {
                  console.error(error)
                }
              }}
            >
              Confirmer la suppression
            </Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </div>
  )
}
