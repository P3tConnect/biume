"use client";

import {
  Form,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { Bell, Shield, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getUserInformations,
  updateUserInformations,
} from "@/src/actions/user.action";
import { clientSettingsSchema } from "./types/settings-schema";
import { useActionMutation, useActionQuery } from "@/src/hooks/action-hooks";
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast";
import { ProfileForm } from "./forms/profile-form";
import { NotificationsForm } from "./forms/notifications-form";
import { SecurityForm } from "./forms/security-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ClientSettingsForm = () => {
  const { data: userInformations, refetch } = useActionQuery(
    getUserInformations,
    {},
    "user-informations",
  );
  const queryClient = useQueryClient();

  const handleRefetch = async () => {
    await refetch();
  };

  const form = useForm<z.infer<typeof clientSettingsSchema>>({
    resolver: zodResolver(clientSettingsSchema),
    values: {
      image: userInformations?.user.image ?? "",
      name: userInformations?.user.name ?? "",
      address: userInformations?.user.address ?? "",
      email: userInformations?.user.email ?? "",
      country: userInformations?.user.country ?? "",
      city: userInformations?.user.city ?? "",
      zipCode: userInformations?.user.zipCode ?? "",
      phoneNumber: userInformations?.user.phoneNumber ?? "",
      emailNotifications: userInformations?.user.emailNotifications ?? false,
      smsNotifications: userInformations?.user.smsNotifications ?? false,
      twoFactorEnabled: userInformations?.user.twoFactorEnabled ?? false,
    },
  });

  const { mutateAsync } = useActionMutation(updateUserInformations, {
    onSuccess: async () => {
      toast.success("Vos informations ont été mises à jour");
      queryClient.invalidateQueries({ queryKey: ["user-informations"] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  const {} = useFormChangeToast({
    form,
    onSubmit,
    message: "Informations modifiées",
    description: "Vos informations sont en attente de mise à jour",
    position: "bottom-center",
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="mx-auto">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="size-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="size-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="size-4" />
              Sécurité
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles et vos préférences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm
                  form={form}
                  userInformations={userInformations}
                  mutateAsync={mutateAsync}
                  onSubmit={onSubmit}
                  refetch={handleRefetch}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notifications</CardTitle>
                <CardDescription>
                  Gérez vos préférences de notifications par email et SMS.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationsForm form={form} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
                <CardDescription>
                  Gérez vos paramètres de sécurité et l'authentification à deux
                  facteurs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SecurityForm form={form} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

export default ClientSettingsForm;
