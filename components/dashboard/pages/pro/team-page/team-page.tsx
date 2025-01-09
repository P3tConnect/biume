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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import TeamList from "./team-list";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Users } from "lucide-react";

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

  const onSubmit = form.handleSubmit(async (data) => {
    // TODO: Implement team member addition logic
    console.log(data);
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Équipe</h1>
          <p className="text-muted-foreground">
            Gérez les membres de votre équipe et leurs accès
          </p>
        </div>
      </div>

      <TeamBudget />

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members" className="gap-2">
            <Users className="h-4 w-4" />
            Membres
          </TabsTrigger>
          <TabsTrigger value="pending">Invitations en attente</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          <Card>
            <CardContent className="p-6">
              <TeamList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center py-8">
                Aucune invitation en attente
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamPageComponent;
