"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { organization as organizationUtil } from "@/src/lib/auth-client";
import { Organization } from "@/src/db/organization";

const inviteFormSchema = z.object({
  email: z.string().email("Email invalide"),
  role: z.enum(["admin", "member", "owner"], {
    required_error: "Veuillez sélectionner un rôle",
  }),
});

interface TeamInviteButtonProps {
  organization: Organization;
}

export const TeamInviteButton = ({ organization }: TeamInviteButtonProps) => {
  const [open, setOpen] = React.useState(false);

  const canInviteMoreMembers = () => {
    const currentMemberCount = organization.members.length;

    switch (organization.plan) {
      case "PREMIUM":
        return currentMemberCount < 5;
      case "ULTIMATE":
        return currentMemberCount < 10;
      default:
        return false;
    }
  };

  const form = useForm<z.infer<typeof inviteFormSchema>>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      role: "member",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await organizationUtil.inviteMember({
        email: data.email,
        role: data.role,
        organizationId: organization.id,
      });

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button
          className="flex items-center gap-2"
          disabled={!canInviteMoreMembers()}
        >
          <Plus className="h-4 w-4" />
          {canInviteMoreMembers()
            ? "Inviter un membre"
            : "Limite de membres atteinte"}
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Inviter un nouveau membre</CredenzaTitle>
          <CredenzaDescription>
            Envoyez une invitation par email pour rejoindre votre équipe.
          </CredenzaDescription>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
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
            <CredenzaFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit">Envoyer l&apos;invitation</Button>
            </CredenzaFooter>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
}; 