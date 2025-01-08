"use client";

import React from "react";
import TeamBudget from "./team-budget";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import TeamList from "./team-list";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TeamPageComponent = () => {
  const schema = z.object({
    email: z.string().email(),
    role: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: {
      email: "",
      role: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {});

  return (
    <>
      <TeamBudget />
      <Dialog>
        <Card>
          <CardHeader className="flex flex-row items-start justify-between text-center font-bold text-2xl">
            <CardTitle>Equipe</CardTitle>
            <DialogTrigger asChild>
              <Button variant="ghost" className="rounded-xl" size="sm">
                <p>Ajouter</p>
              </Button>
            </DialogTrigger>
          </CardHeader>
          <CardContent>
            <TeamList />
          </CardContent>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un membre à l&apos;équipe</DialogTitle>
            <DialogDescription>
              Invitez un nouveau membre à rejoindre votre équipe. Ils recevront
              une invitation par email.
            </DialogDescription>
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
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
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="member">Membre</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="owner">Propriétaire</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Ajouter un membre</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamPageComponent;
