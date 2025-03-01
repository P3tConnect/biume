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
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast";
import { ProfileForm } from "./forms/profile-form";
import { NotificationsForm } from "./forms/notifications-form";
import { SecurityForm } from "./forms/security-form";
import { toast } from "sonner";
import { MutateOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { ActionResult } from "@/src/lib";

const ClientSettingsForm = () => {
  const queryClient = useQueryClient();
  const { data: userInformations, refetch } = useQuery({
    queryKey: ["user-informations"],
    queryFn: () => getUserInformations({}),
  });

  const handleRefetch = async () => {
    await refetch();
  };

  const form = useForm<z.infer<typeof clientSettingsSchema>>({
    resolver: zodResolver(clientSettingsSchema),
    values: {
      image: userInformations?.data?.user.image ?? "",
      name: userInformations?.data?.user.name ?? "",
      address: userInformations?.data?.user.address ?? "",
      email: userInformations?.data?.user.email ?? "",
      country: userInformations?.data?.user.country ?? "",
      city: userInformations?.data?.user.city ?? "",
      zipCode: userInformations?.data?.user.zipCode ?? "",
      phoneNumber: userInformations?.data?.user.phoneNumber ?? "",
      emailNotifications:
        userInformations?.data?.user.emailNotifications ?? false,
      smsNotifications: userInformations?.data?.user.smsNotifications ?? false,
      twoFactorEnabled: userInformations?.data?.user.twoFactorEnabled ?? false,
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: updateUserInformations,
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

  useFormChangeToast({
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
                  onSubmit={onSubmit}
                  refetch={handleRefetch}
                  mutateAsync={mutateAsync}
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
                  Gérez vos paramètres de sécurité et l&apos;authentification à
                  deux facteurs.
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
